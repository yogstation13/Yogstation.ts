import fastifyHelmet from "@fastify/helmet";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(fastifyHelmet, {
    contentSecurityPolicy: false,
    //This is for speculative attacks, if someone uses a weird timing attack for spessmen
    crossOriginEmbedderPolicy: false,
    dnsPrefetchControl: false,
    frameguard: false, //{ action: "DENY" },
  });

  done();
};

export default fp(plugin, {
  name: "helmet",
});
