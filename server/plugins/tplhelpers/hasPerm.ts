import { requestContext } from "@fastify/request-context";
import type { FastifyPluginCallback } from "fastify";
import { hasPerm, WebPermission } from "../../util/index.js";
import type { TemplateHelperOpts } from "../template.js";

const plugin: FastifyPluginCallback<TemplateHelperOpts> = (_, opts, done) => {
  opts.ctx.hasPerm = (perm: WebPermission) => {
    return hasPerm(perm);
  };

  done();
};

export default plugin;
