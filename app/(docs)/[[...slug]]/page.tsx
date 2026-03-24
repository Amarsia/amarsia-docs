import { createRelativeLink } from "fumadocs-ui/mdx"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/page"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getMDXComponents } from "@/components/mdx"
import { source } from "@/lib/source"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.amarsia.com"

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

function getDocPath(slug?: string[]): string {
  return !slug || slug.length === 0 ? "/" : `/${slug.join("/")}`
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) notFound()

  const MDX = page.data.body
  const path = getDocPath(slug)
  const absoluteUrl = new URL(path, siteUrl).toString()
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: page.data.title,
    description: page.data.description,
    url: absoluteUrl,
    mainEntityOfPage: absoluteUrl,
    publisher: {
      "@type": "Organization",
      name: "Amarsia",
      url: siteUrl,
    },
    inLanguage: "en",
  }

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) notFound()

  const canonical = getDocPath(slug)

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      url: canonical,
      type: "article",
    },
    twitter: {
      title: page.data.title,
      description: page.data.description,
    },
  }
}
