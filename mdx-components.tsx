import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "./src/components/mdx/CodeBlock"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre: CodeBlock,
    ...components,
  }
}
