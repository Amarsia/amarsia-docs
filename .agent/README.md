# Agent Authoring Guide

This file is the primary reference for any AI agent writing documentation in this repository. Read it before creating or editing any `.mdx` file.

---

## Repository overview

This is the official Amarsia documentation site. It is built with Next.js + Fumadocs and deployed on Vercel. All documentation lives in `content/docs/`.

### Section map

| Section | Path | Purpose |
|---|---|---|
| Introduction | `content/docs/index.mdx` | Landing page for the docs |
| Concepts | `content/docs/concepts/` | Core ideas, architecture, data model |
| Features | `content/docs/features/` | Product feature guides |
| Integrations | `content/docs/integrations/` | Third-party service guides |
| Client Usage | `content/docs/client-usage/` | SDK and library usage |
| API Reference | `content/docs/api-reference/` | Endpoint reference |

---

## How the docs system works

### MDX files

Every page is an `.mdx` file with YAML frontmatter. Fumadocs processes these at build time into static HTML pages. MDX lets you use React components inline.

### Navigation

Navigation is driven by `meta.json` files — one per folder. The `pages` array controls sidebar order. **A page that is not in `meta.json` will not appear in the sidebar.**

```json
{
  "title": "Section Title",
  "pages": ["index", "page-one", "page-two"]
}
```

### Built-in components

These are available in all MDX files without importing:

| Component | Usage |
|---|---|
| `<Cards>` / `<Card>` | Grid of navigation cards |
| `<Callout type="info|warning|error">` | Highlighted notice block |
| `<Tabs>` / `<Tab>` | Tabbed content panels |
| `<Steps>` | Numbered step list |
| `<Accordions>` / `<Accordion>` | Collapsible sections |

---

## Creating a new page

### Step 1 — Identify the doc type

Pick the type that best fits the content:

- **Concept** — explains an idea or abstraction
- **Feature** — explains a product capability
- **Integration** — guides connecting a third-party service
- **Client usage** — shows how to use an SDK or library
- **API reference** — documents specific endpoints

### Step 2 — Copy the right template

Templates live in `.agent/templates/`. Copy the matching template as your starting point.

### Step 3 — Fill in real content

Replace every `[placeholder]` in the template. Do not publish placeholder content.

### Step 4 — Register the page

Add the filename (without `.mdx`) to the section's `meta.json` in the correct position.

### Step 5 — Run the quality checklist

Complete `.agent/checklists/quality.md` before considering the page done.

---

## Frontmatter reference

```mdx
---
title: Short page title (≤60 chars)
description: One sentence describing what the reader learns. (≤160 chars)
---
```

Both fields are **required**. They are used in the sidebar, page `<title>`, and meta description for SEO.

---

## Writing standards

### Tone
- Direct, clear, and professional. Not casual, not robotic.
- Second person ("you") throughout. Not "the user" or "developers".
- Avoid filler phrases: "It's worth noting that", "Simply", "Just".

### Structure
- Lead every section with the most important information.
- Use tables for anything with more than 2 parameters.
- Use numbered lists for ordered steps. Use bullet lists for unordered items.
- Maximum 4 sentences per paragraph.

### Code examples
- Every code block must specify a language.
- Every example must be correct and runnable as shown.
- Keep examples minimal — include only what's needed to illustrate the point.
- Show the `Authorization` header in every API curl example.

### Links
- Use relative paths for all internal links: `/docs/features/authentication`.
- Every page must end with a `## Related` section with 2–4 internal links.
- Never use bare URLs in body text.

---

## Updating existing pages

When updating a page:

1. Preserve the existing structure unless you have a clear reason to change it.
2. If you rename a page, update every internal link that references it.
3. If you remove content, check whether any other page links to it.
4. Update the frontmatter `description` if the page's focus changes.
5. Do not remove the `## Related` section.

---

## Things an agent must never do

- Invent API endpoints, parameters, or SDK methods that are not confirmed to exist.
- Publish placeholder text (`TODO`, `Coming soon`, `[Insert here]`).
- Create a page without registering it in `meta.json`.
- Delete a page without checking for inbound links.
- Change brand colors or override layout styles in MDX files.
- Add `import` statements for packages not in `package.json`.

---

## Deviation policy

If a page genuinely cannot follow the standard structure, document the reason at the top of the file:

```mdx
{/* deviation: this tutorial uses a linear narrative that requires prose sections between each code step — the standard feature skeleton does not suit this format */}
```

Deviations are acceptable with rationale. Silent deviations are not.

---

## Freshness and maintenance

- If a page references a version number, a specific API response shape, or a third-party UI step, it has a higher risk of going stale.
- When updating pages, note any content that may need future review.
- Deprecated features should not be silently removed — add a `<Callout type="warning">` noting the deprecation and the recommended alternative.

---

## Quick reference: file locations

| File | Purpose |
|---|---|
| `content/docs/` | All documentation MDX files |
| `content/docs/meta.json` | Root navigation order |
| `content/docs/[section]/meta.json` | Section navigation order |
| `.agent/templates/` | Page templates by doc type |
| `.agent/checklists/quality.md` | Pre-publish quality checklist |
| `.cursor/skills/docs-authoring/SKILL.md` | Cursor-specific agent skill |
| `app/globals.css` | Brand tokens and global styles |
| `lib/layout.shared.tsx` | Site navigation configuration |
