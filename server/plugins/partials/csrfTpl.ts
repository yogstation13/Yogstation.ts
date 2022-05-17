import * as eta from "eta";
import type { FastifyPluginCallback } from "fastify";
import type { PartialsOpts } from "../template.js";
const plugin: FastifyPluginCallback<PartialsOpts> = (_, opts, done) => {
  opts.templates.set("csrf", eta.compile("<input type='hidden' name='_csrf' value='<%= _csrf %>'>"));

  done();
};

export default plugin;
