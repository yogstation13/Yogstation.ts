import formBodyPlugin from "@fastify/formbody";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(formBodyPlugin);

  done();
};

export default fp(plugin, {
  name: "formbody",
});
