# Doc Quality Checklist

Run through this checklist before marking any documentation task complete. Items marked **required** will block publication if unmet. Items marked **preferred** are strong defaults — document any omissions.

---

## Frontmatter

- [ ] **[required]** `title` is present, ≤60 characters, and accurately describes the page.
- [ ] **[required]** `description` is present, ≤160 characters, and reads as a complete sentence.
- [ ] Neither field contains placeholder text (`[placeholder]`, `TODO`, `...`).

---

## Content accuracy

- [ ] **[required]** No invented API endpoints, parameters, or SDK methods.
- [ ] **[required]** Every code block is syntactically correct.
- [ ] **[required]** Every code block specifies a language (` ```typescript `, ` ```bash `, ` ```json `).
- [ ] All curl examples include the `Authorization` header.
- [ ] Environment variable names match those used elsewhere in the repo.
- [ ] Version numbers and package names are accurate.

---

## Structure

- [ ] **[required]** Page follows the template for its doc type (or includes a deviation comment).
- [ ] Page begins with an `## Overview` or equivalent section.
- [ ] Page ends with a `## Related` section containing 2–4 links.
- [ ] No section is empty or contains only a heading.

---

## Writing

- [ ] Written in second person ("you", not "the user").
- [ ] No paragraphs longer than 4 sentences.
- [ ] No tables listed as bullet points when they have 3+ options.
- [ ] `<Callout type="warning">` used for anything the reader must not miss.
- [ ] Headings are sentence case (not Title Case).

---

## Navigation

- [ ] **[required]** Page filename (without `.mdx`) is added to the correct `meta.json`.
- [ ] Page is accessible from at least one other page via a link.
- [ ] If a new section folder was created, it is added to `content/docs/meta.json`.

---

## Links

- [ ] All internal links use relative paths (`/section/page`).
- [ ] All internal links resolve to pages that exist.
- [ ] No bare URLs in body text — all URLs are wrapped in named links.

---

## Completeness

- [ ] **[required]** No placeholder text remains (`[placeholder]`, `TODO`, `Coming soon`).
- [ ] All steps in a step-by-step guide are complete and lead to a working result.
- [ ] API reference pages cover all listed endpoints.

---

## Maintenance awareness

- [ ] If the page contains version-specific information, it is noted.
- [ ] Deprecated features reference the recommended alternative.
- [ ] Anything likely to go stale (third-party UI steps, response shapes) is noted for future review.

---

## Sign-off

Once all **required** items are checked and any skipped **preferred** items are noted with a reason, the page is ready to publish.
