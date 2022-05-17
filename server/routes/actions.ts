import { Static, Type } from "@sinclair/typebox";
import config from "config";
import type { FastifyPluginCallback } from "fastify";
import type { Server } from "../plugins/config.js";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get("/", (req, res) => {
    res.view("home");
  });

  const joinQueryParams = Type.Object({
    server_id: Type.Optional(Type.String()),
  });
  fastify.get<{
    Querystring: Static<typeof joinQueryParams>;
  }>(
    "/join",
    {
      schema: {
        querystring: joinQueryParams,
      },
    },
    (req, res) => {
      let server = fastify.getPrimaryServer();
      if (req.query.server_id !== undefined) {
        const servers = config.get<Record<string, Server>>("servers");
        server = servers[req.query.server_id];
        if (!server) {
          return res.notFound("Invalid server_id");
        }
      }

      res.redirect(`byond://${server.host}:${server.port}`);
    },
  );

  fastify.get("/ses", (req, res) => {
    res.send(req.session.data());
  });

  done();
};

export default plugin;
