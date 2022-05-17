import { Static, Type } from "@sinclair/typebox";
import config from "config";
import type { FastifyPluginCallback } from "fastify";
import { ActionLog } from "../../dbentities/ActionLog.js";
import { validateCredentials } from "../../util/forums.js";
import { ckeyify, isWebPerm } from "../../util/index.js";

function validateRedirect(url: string) {}

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  const loginQS = Type.Object({
    next: Type.Optional(Type.String()),
  });

  fastify.get<{
    Querystring: Static<typeof loginQS>;
  }>(
    "/",
    {
      schema: {
        querystring: loginQS,
      },
    },
    (req, res) => {
      if (req.session.identity) {
        let redirect = "/";
        if (req.query.next) {
          const QSnext = new URL(req.query.next, config.get<string>("publicUrl"));
          if (req.raw.headers.host !== QSnext.host) return res.badRequest("Invalid redirection URL");

          redirect = req.query.next;
        }
        res.redirect(redirect);
        return;
      }

      res.view("login/login");
    },
  );

  const loginBody = Type.Object({
    username: Type.String(),
    password: Type.String(),
  });

  fastify.post<{
    Body: Static<typeof loginBody>;
    Querystring: Static<typeof loginQS>;
  }>(
    "/",
    {
      schema: {
        body: loginBody,
        querystring: loginQS,
      },
    },
    async (req, res) => {
      let redirect = "/";
      if (req.query.next) {
        const QSnext = new URL(req.query.next, config.get<string>("publicUrl"));
        if (req.raw.headers.host !== QSnext.host) return res.badRequest("Invalid redirection URL");

        redirect = req.query.next;
      }

      if (req.session.identity) return res.redirect(redirect);

      const result = await validateCredentials(req.body.username, req.body.password, req.ip);

      if (typeof result === "string") {
        req.flash("error", result);
        res.view("login/login");
        return;
      }

      //Find byond account in linked account list
      let byond_account: string | null = null;
      const match = result.linked_accounts.filter(acc => acc.account_type === "byond")[0];
      if (match) byond_account = match.account_id;

      if (byond_account === null) {
        req.flash("error", "This account has no linked ckey, go in game and use the Link Forums Account verb");
        res.view("login/login");
        return;
      }

      const ckey = ckeyify(byond_account);

      await req.em.persistAndFlush(
        req.em.create(ActionLog, {
          adminid: ckey,
          target: ckey,
          description: "Logged in",
          timestamp: null,
        }),
      );

      await res.generateCsrf();
      req.session.identity = `forums:${ckey}`;
      req.session.ckey = ckey;
      req.session.displayName = byond_account;
      req.session.perms = result.permissions.filter(isWebPerm);
      req.session.loginTimestamp = Date.now();

      req.flash("success", "Successfully Logged In");

      res.redirect(redirect);
      return;
    },
  );

  done();
};

export default plugin;
