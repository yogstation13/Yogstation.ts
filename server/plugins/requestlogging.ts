import type { FastifyPluginCallback } from "fastify";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(fastifyRequestLogger);

  done();
};

export default fp(plugin, {
  name: "requestlogging",
});
