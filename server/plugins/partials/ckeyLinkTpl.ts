import * as eta from "eta";
import type { FastifyPluginCallback } from "fastify";
import type { PartialsOpts } from "../template.js";

const plugin: FastifyPluginCallback<PartialsOpts> = (_, opts, done) => {
  opts.templates.set(
    "ckeyLink",
    //language=ejs
    eta.compile("<% param(ckey) %><a href='/players/<%= ckeyify(ckey) %>'><%= ckeyify(ckey) %></a>"),
  );

  done();
};

export default plugin;
