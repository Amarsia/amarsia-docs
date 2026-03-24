import { readFile, stat } from "node:fs/promises"
import { join } from "node:path"

import type { MetadataRoute } from "next"

import { source } from "@/lib/source"

const FRONTMATTER_DATE_FIELDS = [
  "lastUpdated",
  "lastModified",
  "updatedAt",
  "date",
]

function parseFrontmatterDate(rawContent: string): Date | undefined {
  const frontmatterMatch = rawContent.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return undefined

  const frontmatter = frontmatterMatch[1]
  for (const field of FRONTMATTER_DATE_FIELDS) {
    const fieldMatch = frontmatter.match(
      new RegExp(`^${field}:\\s*["']?(.+?)["']?$`, "m"),
    )
    if (!fieldMatch) continue

    const parsed = new Date(fieldMatch[1].trim())
    if (!Number.isNaN(parsed.getTime())) return parsed
  }

  return undefined
}

async function getLastModified(filePath: string): Promise<Date> {
  try {
    const absolutePath = join(process.cwd(), "content/docs", filePath)
    const [fileContent, fileStats] = await Promise.all([
      readFile(absolutePath, "utf8"),
      stat(absolutePath),
    ])

    return parseFrontmatterDate(fileContent) ?? fileStats.mtime
  } catch {
    return new Date()
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.amarsia.com"

  const pages = source.getPages()
  const sitemapEntries = await Promise.all(
    pages.map(async (page) => ({
      url:
        page.slugs.length === 0
          ? siteUrl
          : `${siteUrl}/${page.slugs.join("/")}`,
      lastModified: await getLastModified(page.path),
      priority: page.slugs.length === 0 ? 1 : 0.7,
    })),
  )

  return sitemapEntries
}
