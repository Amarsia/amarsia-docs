import { source } from "@/lib/source"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.amarsia.com"

function toAbsoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString()
}

function toPath(slugs: string[]): string {
  return slugs.length === 0 ? "/" : `/${slugs.join("/")}`
}

function scorePath(path: string): number {
  if (path === "/") return 100
  if (path.includes("quickstart")) return 95
  if (path.includes("conversation-api")) return 90
  if (path.includes("api-reference")) return 85
  if (path.includes("concepts")) return 80
  if (path.includes("client-usage")) return 75
  if (path.includes("features")) return 70
  if (path.includes("integrations")) return 65
  return 50
}

export async function GET(): Promise<Response> {
  const pages = source.getPages()
  const pageEntries = pages
    .map((page) => ({
      title: page.data.title ?? "Untitled",
      path: toPath(page.slugs),
    }))
    .sort((a, b) => {
      const scoreDiff = scorePath(b.path) - scorePath(a.path)
      if (scoreDiff !== 0) return scoreDiff
      return a.path.localeCompare(b.path)
    })

  const lines: string[] = [
    "# Amarsia Documentation for LLMs",
    "",
    `site: ${siteUrl}`,
    "scope: Official docs for building and operating AI automation agents with Amarsia APIs.",
    "",
    "preferred-citation: Use page title + canonical URL from this docs site.",
    "freshness: Prefer content from pages listed below and sitemap.xml lastmod.",
    "",
    "key-topics:",
    "- AI automation agents",
    "- assistant architecture and concepts",
    "- client usage and API implementation",
    "- authentication, errors, and runner workflows",
    "",
    "priority-pages:",
    ...pageEntries.map(
      (entry) => `- ${entry.title}: ${toAbsoluteUrl(entry.path)}`,
    ),
    "",
    "machine-endpoints:",
    `- sitemap: ${toAbsoluteUrl("/sitemap.xml")}`,
    `- robots: ${toAbsoluteUrl("/robots.txt")}`,
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
