import type { FastifyPluginCallback } from "fastify";
import { ckeyify } from "../../util/index.js";
import type { TemplateHelperOpts } from "../template.js";

const plugin: FastifyPluginCallback<TemplateHelperOpts> = (_, opts, done) => {
  opts.ctx.ckeyify = ckeyify;

  done();
};

export default plugin;
