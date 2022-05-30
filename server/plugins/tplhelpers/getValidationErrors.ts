import { requestContext } from "@fastify/request-context";
import type { FastifyPluginCallback } from "fastify";
import type { TemplateHelperOpts } from "../template.js";

const plugin: FastifyPluginCallback<TemplateHelperOpts> = (_, opts, done) => {
  opts.ctx.getValidationErrors = () => {
    return requestContext.get("validationErrors");
  };

  done();
};

export default plugin;
