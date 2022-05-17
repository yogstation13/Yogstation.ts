import fastifyCsrf from "fastify-csrf";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.decorateRequest("csrf", "");

  fastify.addHook<{ Body: { _csrf?: string } }>("preValidation", async (req, res) => {
    if (req.method !== "POST") return;
    if (req.body._csrf !== req.session._csrf) return res.badRequest("Missing CSRF token.");
    if (!req.headers["sec-fetch-site"]) return;
    if (req.headers["sec-fetch-site"] !== "same-origin") return res.badRequest("Same origin fetch metadata is missing.");
  });

  fastify.register(fastifyCsrf, {
    sessionPlugin: "fastify-secure-session",
  });

  done();
};

export default fp(plugin, {
  name: "csrf",
  dependencies: ["session"],
});
