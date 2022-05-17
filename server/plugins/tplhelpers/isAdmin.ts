import { requestContext } from "@fastify/request-context";
import type { FastifyPluginCallback } from "fastify";
import type { TemplateHelperOpts } from "../template.js";

const plugin: FastifyPluginCallback<TemplateHelperOpts> = (_, opts, done) => {
  opts.ctx.isAdmin = () => {
    return Boolean(requestContext.get("session")?.identity);
  };

  done();
};

export default plugin;
