import fastifySensible from "@fastify/sensible";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(fastifySensible, {
    errorHandler: false,
  });

  done();
};

export default fp(plugin, {
  name: "sensible",
});
