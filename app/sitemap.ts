import type { MetadataRoute } from "next"

import { source } from "@/lib/source"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.amarsia.com"

  const pages = source.getPages()

  return pages.map((page) => ({
    url:
      page.slugs.length === 0 ? siteUrl : `${siteUrl}/${page.slugs.join("/")}`,
    lastModified: new Date(),
    priority: page.slugs.length === 0 ? 1 : 0.7,
  }))
}
