# Skill: Amarsia Docs Authoring

## Purpose

This skill governs how AI agents create and edit documentation in this repository. Follow it every time you write, update, or restructure `.mdx` files under `content/docs/`.

---

## 1. Before you write anything

1. Read `.agent/README.md` for the full authoring guide.
2. Identify the correct doc type for the page you are writing (concept, feature, integration, client usage, or API reference).
3. Check the corresponding template in `.agent/templates/`.
4. Check whether the page already exists — update rather than duplicate.
5. Confirm the page will be registered in its section's `meta.json`.

---

## 2. Required frontmatter

Every `.mdx` page **must** include these fields:

```mdx
---
title: Short, descriptive title (≤60 chars)
description: One sentence explaining what the reader will learn. (≤160 chars)
---
```

Optional but encouraged:

```mdx
---
title: ...
description: ...
---
```

Never leave `title` or `description` blank or placeholder.

---

## 3. Page structure by type

Use the skeleton that matches the page type. Deviations are allowed when there is a clear reason; note the reason in a comment at the top of the file.

### Concept page
```
## Overview          ← What it is and why it matters (2–4 sentences)
## How it works      ← Mechanism, with a simple diagram or code if useful
## Key terms         ← Table of terms and definitions
## Related           ← 2–4 links to related pages
```

### Feature page
```
## Overview          ← What the feature does and when to use it
## Getting started   ← Minimal working example
## Configuration     ← All options, as a table where possible
## Examples          ← 1–2 realistic use cases
## Related           ← Links to related features or API endpoints
```

### Integration page
```
## Overview          ← What the integration does
## Prerequisites     ← What the reader needs before starting
## Step N — ...      ← Numbered steps, each with a concrete code block
## Verification      ← How to confirm the integration works
## Related           ← Links to relevant features and API pages
```

### Client usage page
```
## Installation      ← Install command
## Quick start       ← Working example in <20 lines
## Authentication    ← How to pass credentials
## Core operations   ← Key operations with code examples
## Related           ← Links to API reference and error handling
```

### API reference page
```
## [Method] [endpoint]   ← One H2 per endpoint
  Description
  Query/body params table
  Request example (curl)
  Response example (JSON)
```

---

## 4. Writing style rules

- **Lead with value.** The first sentence of every section should tell the reader what they get, not what the section is.
- **Be implementation-accurate.** Every code block must be correct and runnable. Invent no APIs.
- **Prefer tables for options and parameters.** Never list more than 3 options in prose when a table would be clearer.
- **Use second person.** Write "you" not "the user" or "the developer".
- **Sentence case for headings.** Not title case.
- **Short paragraphs.** No paragraph over 4 sentences. Break dense content into steps or lists.
- **Callouts for warnings and important notes.** Use `<Callout type="warning">` for anything the reader must not miss.

---

## 5. Code blocks

- Always specify the language: ` ```typescript `, ` ```bash `, ` ```json `.
- Show real, working examples — not pseudocode.
- Keep examples minimal: remove everything not needed to illustrate the point.
- For curl examples: always include `Authorization` header and `Content-Type` where required.

---

## 6. Linking policy

- Use relative paths for all internal links: `[Authentication](/features/authentication)`.
- Every page must end with a `## Related` section linking to 2–4 relevant pages.
- Do not create orphan pages. Ensure the page appears in `meta.json` before committing.
- Do not use bare URLs in body text — always use named links.

---

## 7. Navigation registration

After creating a new page at `content/docs/section/page-name.mdx`:

1. Open `content/docs/section/meta.json`.
2. Add `"page-name"` to the `pages` array in the correct position.
3. If the page is a new top-level section folder, also add it to `content/docs/meta.json`.

---

## 8. What you must not do

- Do not invent API endpoints, parameters, or fields that are not confirmed to exist.
- Do not add placeholder content (`TODO`, `...`, `Coming soon`) in pages that will be published.
- Do not duplicate content across pages — link instead.
- Do not remove existing pages without confirming they are unreferenced.
- Do not override brand styles inline unless explicitly requested.

---

## 9. Quality check before finishing

Run through `.agent/checklists/quality.md` before marking any doc task complete.

---

## Exception path

If a page needs to deviate from this guide (e.g. a tutorial that cannot follow the concept skeleton), add a comment at the top of the file:

```mdx
{/* deviation: tutorial format — linear step-by-step suits this page better than the concept skeleton */}
```

Deviations are accepted with rationale. Silent deviations are not.
