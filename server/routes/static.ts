import fastifyStatic from "@fastify/static";
import type { FastifyPluginCallback } from "fastify";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.addHook("preHandler", (req, res, done) => {
    res.cacheControl("public");
    res.cacheControl("max-age", 360);
    res.cacheControl("stale-while-revalidate", 3600);
    res.cacheControl("proxy-revalidate");

    done();
  });

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, "../static"),
    prefix: "/static",
    list: false,
  });

  done();
};

export default plugin;
