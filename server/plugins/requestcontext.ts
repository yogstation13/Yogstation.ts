import { fastifyRequestContextPlugin } from "@fastify/request-context";
import type { Session } from "@fastify/secure-session";
import type { EntityManager } from "@mikro-orm/mariadb";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

declare module "@fastify/request-context" {
  interface RequestContextData {
    session: Session;
    em: EntityManager;
  }
}
const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(fastifyRequestContextPlugin);

  done();
};

export default fp(plugin, {
  name: "requestcontext",
});
