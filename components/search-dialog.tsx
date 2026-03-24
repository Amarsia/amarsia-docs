"use client"

import { useMemo } from "react"

import type { HighlightedText } from "fumadocs-core/search"
import { useDocsSearch } from "fumadocs-core/search/client"
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogListItem,
  SearchDialogOverlay,
  type SearchItemType,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search"

interface SearchDialogWithPreviewProps extends SharedProps {
  links?: Array<[name: string, href: string]>
  api?: string
  delayMs?: number
}

type SearchResultWithPreview = SearchItemType & {
  excerpt?: string
  excerptWithHighlights?: HighlightedText<string>[]
}

function renderHighlights(highlights: HighlightedText<string>[]) {
  return highlights.map((node, index) => {
    if (node.styles?.highlight) {
      return (
        <span
          key={index}
          className="text-[#ff4914] underline decoration-[#ff4914] underline-offset-4"
        >
          {node.content}
        </span>
      )
    }

    return <span key={index}>{node.content}</span>
  })
}

export default function SearchDialogWithPreview({
  open,
  onOpenChange,
  links = [],
  api = "/api/search",
  delayMs = 120,
}: SearchDialogWithPreviewProps) {
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    api,
    delayMs,
  })

  const defaultItems = useMemo(() => {
    if (links.length === 0) return null

    return links.map(([name, href]) => ({
      type: "page" as const,
      id: name,
      content: name,
      url: href,
    }))
  }, [links])

  return (
    <SearchDialog
      open={open}
      onOpenChange={onOpenChange}
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
    >
      <SearchDialogOverlay />
      <SearchDialogContent className="border-fd-border/80 max-w-screen-md rounded-2xl shadow-xl shadow-black/18">
        <SearchDialogHeader className="px-6 py-4">
          <SearchDialogIcon />
          <SearchDialogInput className="text-base leading-7" />
          <SearchDialogClose />
        </SearchDialogHeader>

        <SearchDialogList
          className="am-search-list"
          items={query.data !== "empty" ? query.data : defaultItems}
          Empty={() => (
            <div className="am-search-empty">
              <div className="text-fd-muted-foreground text-sm">No results</div>
            </div>
          )}
          Item={({ item, onClick }) => {
            if (item.type === "action") {
              return (
                <SearchDialogListItem
                  item={item}
                  onClick={onClick}
                  onPointerMove={() => undefined}
                  className="hover:bg-fd-accent/30 aria-selected:border-fd-border aria-selected:bg-fd-accent/45 mb-1.5 rounded-xl border border-transparent px-4 py-3 transition-colors last:mb-0"
                />
              )
            }

            const result = item as SearchResultWithPreview

            return (
              <SearchDialogListItem
                item={item}
                onClick={onClick}
                onPointerMove={() => undefined}
                className="hover:bg-fd-accent/30 aria-selected:border-fd-border aria-selected:bg-fd-accent/45 mb-1.5 rounded-xl border border-transparent px-4 py-3 transition-colors last:mb-0"
              >
                <div className="min-w-0">
                  <p className="truncate text-[1.03rem] leading-6 font-semibold tracking-[-0.005em]">
                    {item.contentWithHighlights
                      ? renderHighlights(
                          item.contentWithHighlights as HighlightedText<string>[],
                        )
                      : item.content}
                  </p>
                  {(result.excerptWithHighlights || result.excerpt) && (
                    <p className="text-fd-muted-foreground/90 mt-1.5 text-sm leading-6">
                      {result.excerptWithHighlights
                        ? renderHighlights(result.excerptWithHighlights)
                        : result.excerpt}
                    </p>
                  )}
                </div>
              </SearchDialogListItem>
            )
          }}
        />
      </SearchDialogContent>
    </SearchDialog>
  )
}
