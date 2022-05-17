import type { FastifyPluginCallback } from "fastify";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post("/", async (req, res) => {
    //TODO: Check logged in

    await res.logout();
    res.redirect("/");
  });

  fastify.get("/", (req, res) => {
    res.redirect("/");
  });

  done();
};

export default plugin;
