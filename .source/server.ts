// @ts-nocheck
import * as __fd_glob_23 from "../content/docs/integrations/stripe.mdx?collection=docs"
import * as __fd_glob_22 from "../content/docs/integrations/slack.mdx?collection=docs"
import * as __fd_glob_21 from "../content/docs/integrations/index.mdx?collection=docs"
import * as __fd_glob_20 from "../content/docs/features/webhooks.mdx?collection=docs"
import * as __fd_glob_19 from "../content/docs/features/permissions.mdx?collection=docs"
import * as __fd_glob_18 from "../content/docs/features/index.mdx?collection=docs"
import * as __fd_glob_17 from "../content/docs/features/authentication.mdx?collection=docs"
import * as __fd_glob_16 from "../content/docs/concepts/index.mdx?collection=docs"
import * as __fd_glob_15 from "../content/docs/concepts/data-model.mdx?collection=docs"
import * as __fd_glob_14 from "../content/docs/concepts/architecture.mdx?collection=docs"
import * as __fd_glob_13 from "../content/docs/client-usage/javascript.mdx?collection=docs"
import * as __fd_glob_12 from "../content/docs/client-usage/index.mdx?collection=docs"
import * as __fd_glob_11 from "../content/docs/client-usage/error-handling.mdx?collection=docs"
import * as __fd_glob_10 from "../content/docs/api-reference/resources.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/api-reference/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/api-reference/events.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/api-reference/authentication.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/index.mdx?collection=docs"
import { default as __fd_glob_5 } from "../content/docs/integrations/meta.json?collection=docs"
import { default as __fd_glob_4 } from "../content/docs/features/meta.json?collection=docs"
import { default as __fd_glob_3 } from "../content/docs/concepts/meta.json?collection=docs"
import { default as __fd_glob_2 } from "../content/docs/client-usage/meta.json?collection=docs"
import { default as __fd_glob_1 } from "../content/docs/api-reference/meta.json?collection=docs"
import { default as __fd_glob_0 } from "../content/docs/meta.json?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.docs("docs", "content/docs", {"meta.json": __fd_glob_0, "api-reference/meta.json": __fd_glob_1, "client-usage/meta.json": __fd_glob_2, "concepts/meta.json": __fd_glob_3, "features/meta.json": __fd_glob_4, "integrations/meta.json": __fd_glob_5, }, {"index.mdx": __fd_glob_6, "api-reference/authentication.mdx": __fd_glob_7, "api-reference/events.mdx": __fd_glob_8, "api-reference/index.mdx": __fd_glob_9, "api-reference/resources.mdx": __fd_glob_10, "client-usage/error-handling.mdx": __fd_glob_11, "client-usage/index.mdx": __fd_glob_12, "client-usage/javascript.mdx": __fd_glob_13, "concepts/architecture.mdx": __fd_glob_14, "concepts/data-model.mdx": __fd_glob_15, "concepts/index.mdx": __fd_glob_16, "features/authentication.mdx": __fd_glob_17, "features/index.mdx": __fd_glob_18, "features/permissions.mdx": __fd_glob_19, "features/webhooks.mdx": __fd_glob_20, "integrations/index.mdx": __fd_glob_21, "integrations/slack.mdx": __fd_glob_22, "integrations/stripe.mdx": __fd_glob_23, });