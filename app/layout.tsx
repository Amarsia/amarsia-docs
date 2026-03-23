import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.amarsia.com',
  ),
  title: {
    template: '%s | Amarsia Docs',
    default: 'Amarsia Documentation',
  },
  description:
    'Official Amarsia documentation — concepts, features, integrations, client usage, and API reference.',
  // ─── Icons ───────────────────────────────────────────────────────────────
  // Next.js also auto-discovers app/favicon.ico, app/icon.svg, app/apple-icon.png
  // The entries below let you control rel/sizes/type explicitly if needed.
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  // ─── Open Graph ──────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    siteName: 'Amarsia Docs',
    images: [
      {
        url: '/opengraph-image.png', // place a 1200×630 image at app/opengraph-image.png
        width: 1200,
        height: 630,
        alt: 'Amarsia Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <RootProvider theme={{ defaultTheme: 'system', enableSystem: true }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
