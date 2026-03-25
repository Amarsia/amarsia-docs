import type { ReactNode } from "react"

import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock"

type ApiReferenceBlockProps = {
  /** REST API method badge — omit for SDK/React tracks */
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  /** REST endpoint path — omit for SDK/React tracks */
  path?: string
  /** SDK/React function signature shown instead of method+path */
  title?: string
  code: string
  language?: string
  children: ReactNode
}

export function ApiReferenceBlock({
  method,
  path,
  title,
  code,
  language = "typescript",
  children,
}: ApiReferenceBlockProps) {
  const hasEndpoint = method && path

  return (
    <section className="am-api-section">
      {hasEndpoint && (
        <p className="am-api-endpoint">
          <span
            className={`am-api-method am-api-method-${method.toLowerCase()}`}
          >
            {method}
          </span>
          <code>{path}</code>
        </p>
      )}
      {!hasEndpoint && title && <p className="am-api-sig">{title}</p>}
      <div className="am-api-code">
        <DynamicCodeBlock lang={language} code={code} />
      </div>
      <div className="am-api-content">{children}</div>
    </section>
  )
}
