import config from "config";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

export interface Server {
  sqlname: string;
  host: string;
  port: number;
  name: string;
  comms_key: string;
}

declare module "fastify" {
  interface FastifyInstance {
    getPrimaryServer: () => Server;
  }
}

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.decorate("getPrimaryServer", () => config.get<Server>("servers.primary"));

  done();
};

export default fp(plugin, {
  name: "config",
});
