import { readFile } from "node:fs/promises"
import { join } from "node:path"

import {
  createContentHighlighter,
  createSearchAPI,
} from "fumadocs-core/search/server"
import GithubSlugger from "github-slugger"

import { source } from "@/lib/source"

interface HeadingAnchor {
  slug: string
  pos: number
}

interface IndexedPage {
  url: string
  title: string
  description: string
  content: string
  keywords: string
  headings: HeadingAnchor[]
}

function stripFrontmatter(raw: string): string {
  return raw.replace(/^---[\s\S]*?---\s*/m, "")
}

function sanitizeText(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*|]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function sanitizeHeadingForSlug(value: string): string {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+([?!.,:;])/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[?!.,:;]+$/g, "")
    .trim()
}

function buildContentAndAnchors(markdown: string): {
  content: string
  headings: HeadingAnchor[]
} {
  const lines = markdown.split("\n")
  const slugger = new GithubSlugger()
  const headings: HeadingAnchor[] = []
  const parts: string[] = []
  let inCodeFence = false
  let currentPos = 0

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence
      continue
    }
    if (inCodeFence) continue

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const headingText = sanitizeText(headingMatch[2])
      const slugInput = sanitizeHeadingForSlug(headingMatch[2])
      if (headingText.length > 0 && slugInput.length > 0) {
        headings.push({
          slug: slugger.slug(slugInput),
          pos: currentPos,
        })
        parts.push(headingText)
        currentPos += headingText.length + 1
      }
      continue
    }

    const sanitized = sanitizeText(rawLine)
    if (sanitized.length === 0) continue
    parts.push(sanitized)
    currentPos += sanitized.length + 1
  }

  return {
    content: parts.join(" ").trim(),
    headings,
  }
}

function findBestIndex(content: string, query: string): number {
  if (!content) return -1

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .map((term) => term.trim())
    .filter((term) => term.length > 1)
  const lower = content.toLowerCase()

  let bestIndex = -1
  for (const term of terms) {
    const idx = lower.indexOf(term)
    if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
      bestIndex = idx
    }
  }

  return bestIndex
}

const indexedPagesPromise: Promise<IndexedPage[]> = Promise.all(
  source.getPages().map(async (page) => {
    const filePath = join(process.cwd(), "content/docs", page.path)
    const raw = await readFile(filePath, "utf8").catch(() => "")
    const body = stripFrontmatter(raw)
    const { content, headings } = buildContentAndAnchors(body)

    return {
      url: page.url,
      title: page.data.title ?? page.url,
      description: page.data.description ?? "",
      content,
      keywords: "",
      headings,
    }
  }),
)

const searchApi = createSearchAPI("simple", {
  language: "english",
  indexes: async () => indexedPagesPromise,
})

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function pickSnippet(content: string, query: string): string {
  if (!content) return ""
  const bestIndex = findBestIndex(content, query)

  if (bestIndex === -1) {
    return content.slice(0, 200).trim()
  }

  let start = Math.max(0, bestIndex - 100)
  let end = Math.min(content.length, bestIndex + 180)

  // Align snippet boundaries to full words for cleaner previews.
  if (start > 0) {
    const nextSpace = content.indexOf(" ", start)
    if (nextSpace !== -1 && nextSpace < bestIndex) {
      start = nextSpace + 1
    }
  }
  if (end < content.length) {
    const prevSpace = content.lastIndexOf(" ", end)
    if (prevSpace !== -1 && prevSpace > bestIndex) {
      end = prevSpace
    }
  }

  const before = start > 0 ? "... " : ""
  const after = end < content.length ? " ..." : ""
  const core = content
    .slice(start, end)
    .trim()
    .replace(/^[,.;:!?)\]-]+\s*/g, "")

  return `${before}${core}${after}`
}

function findClosestHeadingSlug(
  headings: HeadingAnchor[],
  index: number,
): string | undefined {
  if (index < 0 || headings.length === 0) return undefined

  let closest: HeadingAnchor | undefined
  for (const heading of headings) {
    if (heading.pos <= index) {
      closest = heading
    } else {
      break
    }
  }

  return closest?.slug
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const query = url.searchParams.get("query")?.trim() ?? ""

  if (!query) return Response.json([])

  const [results, pages] = await Promise.all([
    searchApi.search(query),
    indexedPagesPromise,
  ])
  const pagesByUrl = new Map(pages.map((page) => [page.url, page]))
  const highlighter = createContentHighlighter(
    new RegExp(escapeRegExp(query), "gi"),
  )

  const enriched = results.map((item) => {
    const page = pagesByUrl.get(item.url)
    const snippet = pickSnippet(page?.content ?? "", query)
    const bestIndex = findBestIndex(page?.content ?? "", query)
    const headingSlug = page
      ? findClosestHeadingSlug(page.headings, bestIndex)
      : undefined
    const targetUrl = headingSlug ? `${item.url}#${headingSlug}` : item.url

    return {
      ...item,
      url: targetUrl,
      excerpt: snippet,
      excerptWithHighlights: snippet
        ? highlighter.highlight(snippet)
        : undefined,
    }
  })

  return Response.json(enriched)
}
