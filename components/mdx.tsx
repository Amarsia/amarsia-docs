import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

import { ApiReferenceBlock } from "@/components/api-reference"
import { TrackContent, TrackHint, TrackSelector } from "@/components/docs-track"

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ApiReferenceBlock,
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
