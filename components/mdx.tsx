import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

/**
 * Central MDX component registry.
 * Add custom components here to make them available in all MDX files
 * without needing to import them individually.
 */
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
  }
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
