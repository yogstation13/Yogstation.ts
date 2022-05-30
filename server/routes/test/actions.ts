import { Static, Type } from "@sinclair/typebox";
import type { FastifyPluginCallback } from "fastify";
import { Loa } from "../../dbentities/Loa.js";
import { getFrontpageStaff } from "../../util/forums.js";
import { authRoute, getValidations } from "../../util/index.js";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get("", (req, res) => {
    req.flash("error", "penis");
    req.flash("success", "Successful penis!");
    res.send(req.session.data());
  });

  const loginQueryParams = Type.Object({
    username: Type.String(),
    test: Type.Integer(),
  });
  fastify.get<{
    Querystring: Static<typeof loginQueryParams>;
  }>(
    "/login",
    {
      schema: {
        querystring: loginQueryParams,
      },
      attachValidation: true,
    },
    (req, res) => {
      if (req.validationError) {
        res.view("test");
        return;
      }

      req.session.identity = `local:${req.query.username}`;
      req.session.displayName = req.query.username;
      res.send(req.session.data());
    },
  );

  fastify.get("/logout", (req, res) => {
    req.session.delete();
    res.send("See you soon!");
  });

  const testQP = Type.Object({
    groups: Type.Array(Type.Integer()),
  });
  fastify.get<{
    Querystring: Static<typeof testQP>;
  }>(
    "/nice",
    {
      schema: {
        querystring: testQP,
      },
    },
    async () => {
      return await getFrontpageStaff();
    },
  );

  fastify.get(
    "/auth",
    {
      preValidation: authRoute("ban.add"),
    },
    (req, res) => {
      res.send("Bruh");
    },
  );

  fastify.get("/wtf", async req => {
    const val = await req.em.findOne(Loa, 537);
    console.log(val?.time.toLocaleString());
    return val;
  });

  fastify.get("/error", () => {
    throw Error("lol");
  });

  done();
};

export default plugin;
