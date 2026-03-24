// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "api-reference/authentication.mdx": () => import("../content/docs/api-reference/authentication.mdx?collection=docs"), "api-reference/conversation.mdx": () => import("../content/docs/api-reference/conversation.mdx?collection=docs"), "api-reference/errors.mdx": () => import("../content/docs/api-reference/errors.mdx?collection=docs"), "api-reference/index.mdx": () => import("../content/docs/api-reference/index.mdx?collection=docs"), "api-reference/runner.mdx": () => import("../content/docs/api-reference/runner.mdx?collection=docs"), "client-usage/conversation-api.mdx": () => import("../content/docs/client-usage/conversation-api.mdx?collection=docs"), "client-usage/error-handling.mdx": () => import("../content/docs/client-usage/error-handling.mdx?collection=docs"), "client-usage/multimodal.mdx": () => import("../content/docs/client-usage/multimodal.mdx?collection=docs"), "client-usage/quickstart.mdx": () => import("../content/docs/client-usage/quickstart.mdx?collection=docs"), "concepts/actions.mdx": () => import("../content/docs/concepts/actions.mdx?collection=docs"), "concepts/api-key.mdx": () => import("../content/docs/concepts/api-key.mdx?collection=docs"), "concepts/assistants.mdx": () => import("../content/docs/concepts/assistants.mdx?collection=docs"), "concepts/index.mdx": () => import("../content/docs/concepts/index.mdx?collection=docs"), "concepts/knowledge-base.mdx": () => import("../content/docs/concepts/knowledge-base.mdx?collection=docs"), "concepts/usage.mdx": () => import("../content/docs/concepts/usage.mdx?collection=docs"), "features/index.mdx": () => import("../content/docs/features/index.mdx?collection=docs"), "integrations/index.mdx": () => import("../content/docs/integrations/index.mdx?collection=docs"), }),
};
export default browserCollections;