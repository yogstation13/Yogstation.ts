// eslint-disable-next-line import/default
import fastifyAutoload from "@fastify/autoload";
import type { SessionData } from "@fastify/secure-session";
import config from "config";
import * as eta from "eta";
import type { TemplateFunction } from "eta/dist/types/compile.js";
import type { EtaConfig } from "eta/dist/types/config";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { dirname, join } from "path";
import pointOfView from "point-of-view";
import { fileURLToPath } from "url";
import type { ArrayType } from "../types/util.js";
import { isEmpty, toRelativeTime } from "../util/index.js";
import type { FlashMap } from "./flash.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface Locals {
  session: SessionData;
  url: string;
  getFlashes: () => FlashMap | false;
  _csrf: string;
  modifyQuery: (query: Record<string, string>) => string;
}

declare module "fastify" {
  interface FastifyReply {
    locals: Partial<Locals> | undefined;
  }
}

export interface TemplateHelperOpts {
  ctx: Record<string | symbol, unknown>;
  plugins: typeof eta.config.plugins;
  getTpl: typeof getTemplate;
}

export interface PartialsOpts {
  readonly ctx: Readonly<Record<string, unknown>>;
  readonly plugins: ReadonlyArray<ArrayType<typeof eta.config.plugins>>;
  readonly getTpl: typeof getTemplate;
  templates: typeof templates;
}

const templates = new Map<string, TemplateFunction>();
const getTemplate = function (this: EtaConfig, tpl: string) {
  const template = templates.get(tpl) ?? eta.templates.get(tpl);
  if (template === undefined) throw Error(`Template "${tpl}" is undefined`);

  return template;
}.bind(eta.config);

const plugin: FastifyPluginAsync = async fastify => {
  const context = {
    cfg: config,
    relativeDate: toRelativeTime,
  };
  const plugins: typeof eta.config.plugins = [];

  await fastify.register(fastifyAutoload, {
    dir: join(__dirname, "tplhelpers"),
    forceESM: true,
    encapsulate: false,
    options: {
      ctx: context,
      plugins,
      getTpl: getTemplate,
    } as TemplateHelperOpts,
  });

  eta.configure({
    autoTrim: "slurp",
    cache: config.get<boolean>("cacheTemplates"),
    useWith: true,
    plugins,
    include: function (this: EtaConfig, tpl: string, data: object) {
      return getTemplate(tpl)(data, this);
    },
  });

  await fastify.register(fastifyAutoload, {
    dir: join(__dirname, "partials"),
    forceESM: true,
    encapsulate: false,
    options: {
      ctx: context,
      plugins,
      getTpl: getTemplate,
      templates,
    } as PartialsOpts,
  });

  fastify.register(pointOfView, {
    engine: {
      eta: eta,
    },
    root: "./templates",
    includeViewExtension: true,
    defaultContext: context,
  });
  fastify.addHook("onRequest", (req, res, done) => {
    res.locals = {
      session: req.session.data(),
      url: req.url,
      getFlashes: () => {
        const flashes = res.flash() as FlashMap;
        if (isEmpty(flashes)) return false;
        return flashes;
      },
      modifyQuery: queryMods => {
        const url = new URL(req.url, config.get<string>("publicUrl"));
        for (const [key, val] of Object.entries(queryMods)) {
          url.searchParams.set(key, val);
        }
        return url.toString();
      },
      _csrf: req.session._csrf,
    };
    done();
  });
};

export default fp(plugin, {
  name: "template",
  dependencies: ["session", "requestcontext", "config", "csrf"],
});
