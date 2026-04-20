// @ts-nocheck
import { default as __fd_glob_27 } from "../content/docs/features/meta.json?collection=docs"
import { default as __fd_glob_26 } from "../content/docs/concepts/meta.json?collection=docs"
import { default as __fd_glob_25 } from "../content/docs/integrations/meta.json?collection=docs"
import { default as __fd_glob_24 } from "../content/docs/api-reference/meta.json?collection=docs"
import { default as __fd_glob_23 } from "../content/docs/client-usage/meta.json?collection=docs"
import { default as __fd_glob_22 } from "../content/docs/meta.json?collection=docs"
import * as __fd_glob_21 from "../content/docs/integrations/index.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/features/index.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/concepts/usage.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/concepts/test-cases.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/concepts/security.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/concepts/knowledge-base.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/concepts/index.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/concepts/evaluations.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/concepts/assistants.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/concepts/api-key.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/concepts/actions.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/client-usage/quickstart.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/client-usage/multimodal.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/client-usage/error-handling.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/client-usage/conversations.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/client-usage/assistant-runner.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/api-reference/runner.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/api-reference/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/api-reference/errors.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/api-reference/conversation.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/api-reference/authentication.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_22, "client-usage/meta.json": __fd_glob_23, "api-reference/meta.json": __fd_glob_24, "integrations/meta.json": __fd_glob_25, "concepts/meta.json": __fd_glob_26, "features/meta.json": __fd_glob_27, }, {"index.mdx": __fd_glob_0, "api-reference/authentication.mdx": __fd_glob_1, "api-reference/conversation.mdx": __fd_glob_2, "api-reference/errors.mdx": __fd_glob_3, "api-reference/index.mdx": __fd_glob_4, "api-reference/runner.mdx": __fd_glob_5, "client-usage/assistant-runner.mdx": __fd_glob_6, "client-usage/conversations.mdx": __fd_glob_7, "client-usage/error-handling.mdx": __fd_glob_8, "client-usage/multimodal.mdx": __fd_glob_9, "client-usage/quickstart.mdx": __fd_glob_10, "concepts/actions.mdx": __fd_glob_11, "concepts/api-key.mdx": __fd_glob_12, "concepts/assistants.mdx": __fd_glob_13, "concepts/evaluations.mdx": __fd_glob_14, "concepts/index.mdx": __fd_glob_15, "concepts/knowledge-base.mdx": __fd_glob_16, "concepts/security.mdx": __fd_glob_17, "concepts/test-cases.mdx": __fd_glob_18, "concepts/usage.mdx": __fd_glob_19, "features/index.mdx": __fd_glob_20, "integrations/index.mdx": __fd_glob_21, });