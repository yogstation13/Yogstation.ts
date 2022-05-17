import fastifyFlash from "@fastify/flash";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";

export type FlashCategory = "success" | "error";
export type FlashMap = {
  [category in FlashCategory]: string[] | undefined;
};

declare module "fastify" {
  export interface FastifyRequest {
    flash: (type: FlashCategory, ...messages: string[] | [string[]]) => number;
  }
  export interface FastifyReply {
    flash: (category?: FlashCategory) => string[] | FlashMap;
  }
}

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(fastifyFlash);

  done();
};

export default fp(plugin, {
  name: "flash",
  dependencies: ["session"],
});
