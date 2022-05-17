import trapsPluginCallback from "@dnlup/fastify-traps";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(trapsPluginCallback);

  done();
};

export default fp(plugin, {
  name: "traps",
});
