import type { ReactNode } from "react"

import { RootProvider } from "fumadocs-ui/provider/next"
import type { Metadata } from "next"
import { Lexend, Playfair_Display } from "next/font/google"

import SearchDialogWithPreview from "@/components/search-dialog"
import "./globals.css"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://docs.amarsia.com"

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Amarsia Docs",
    default: "Amarsia Documentation",
  },
  description:
    "Official Amarsia documentation for building AI automation agents with concepts, client usage patterns, and API reference.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "Amarsia Docs",
    title: "Amarsia Documentation",
    description:
      "Official Amarsia documentation for building AI automation agents with concepts, client usage patterns, and API reference.",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Amarsia Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amarsia Documentation",
    description:
      "Official Amarsia documentation for building AI automation agents with concepts, client usage patterns, and API reference.",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Amarsia Docs",
    url: siteUrl,
    description: metadata.description,
    inLanguage: "en",
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Amarsia",
    url: siteUrl,
    logo: `${siteUrl}/apple-icon.png`,
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lexend.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <RootProvider
          theme={{ defaultTheme: "system", enableSystem: true }}
          search={{
            SearchDialog: SearchDialogWithPreview,
            options: {
              api: "/api/search",
              delayMs: 120,
            },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
