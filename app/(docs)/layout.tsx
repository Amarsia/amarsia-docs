import type { ReactNode } from "react"

import { DocsLayout } from "fumadocs-ui/layouts/docs"

import { TrackBannerBar, TrackProvider } from "@/components/docs-track"
import { baseOptions } from "@/lib/layout.shared"
import { source } from "@/lib/source"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <TrackProvider>
      <DocsLayout
        tree={source.pageTree}
        {...baseOptions()}
        sidebar={{ banner: <TrackBannerBar /> }}
      >
        {children}
      </DocsLayout>
    </TrackProvider>
  )
}
