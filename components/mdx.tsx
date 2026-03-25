import type { ComponentPropsWithoutRef } from "react"

import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

import { ApiReferenceBlock } from "@/components/api-reference"
import { TrackContent, TrackHint, TrackSelector } from "@/components/docs-track"

function MdxTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="am-table-wrap">
      <table {...props} />
    </div>
  )
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ApiReferenceBlock,
    table: MdxTable,
    TrackSelector,
    TrackContent,
    TrackHint,
    ...components,
  }
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
