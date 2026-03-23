// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "api-reference/authentication.mdx": () => import("../content/docs/api-reference/authentication.mdx?collection=docs"), "api-reference/events.mdx": () => import("../content/docs/api-reference/events.mdx?collection=docs"), "api-reference/index.mdx": () => import("../content/docs/api-reference/index.mdx?collection=docs"), "api-reference/resources.mdx": () => import("../content/docs/api-reference/resources.mdx?collection=docs"), "client-usage/error-handling.mdx": () => import("../content/docs/client-usage/error-handling.mdx?collection=docs"), "client-usage/index.mdx": () => import("../content/docs/client-usage/index.mdx?collection=docs"), "client-usage/javascript.mdx": () => import("../content/docs/client-usage/javascript.mdx?collection=docs"), "concepts/architecture.mdx": () => import("../content/docs/concepts/architecture.mdx?collection=docs"), "concepts/data-model.mdx": () => import("../content/docs/concepts/data-model.mdx?collection=docs"), "concepts/index.mdx": () => import("../content/docs/concepts/index.mdx?collection=docs"), "features/authentication.mdx": () => import("../content/docs/features/authentication.mdx?collection=docs"), "features/index.mdx": () => import("../content/docs/features/index.mdx?collection=docs"), "features/permissions.mdx": () => import("../content/docs/features/permissions.mdx?collection=docs"), "features/webhooks.mdx": () => import("../content/docs/features/webhooks.mdx?collection=docs"), "integrations/index.mdx": () => import("../content/docs/integrations/index.mdx?collection=docs"), "integrations/slack.mdx": () => import("../content/docs/integrations/slack.mdx?collection=docs"), "integrations/stripe.mdx": () => import("../content/docs/integrations/stripe.mdx?collection=docs"), }),
};
export default browserCollections;