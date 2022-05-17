import SecureSessionPlugin from "@fastify/secure-session";
import config from "config";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import { ActionLog } from "../dbentities/ActionLog.js";
import type { FlashCategory } from "./flash.js";

declare module "@fastify/secure-session" {
  interface SessionData {
    identity: string;
    displayName: string;
    perms: string[];
    ckey: string;
    loginTimestamp: number;
    _csrf: string;
  }
}

declare module "fastify" {
  interface FastifyReply {
    logout: (msg?: string, category?: FlashCategory) => Promise<void>;
  }
}

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(SecureSessionPlugin, {
    key: config.get<string[]>("session.signingKeys").map(key => Buffer.from(key, "hex")),
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      path: "/",
    },
  });

  fastify.addHook("preHandler", async (req, res) => {
    req.requestContext.set("session", req.session);

    if (req.session.loginTimestamp) {
      const expiry = req.session.loginTimestamp + config.get<number>("session.expiry") * 60 * 1000;
      if (Date.now() > expiry) {
        await res.logout(`Your session expired. <a href='/login?next=${encodeURIComponent(req.url)}'>Click here to login</a>`, "error");
        return res.redirect("/");
      }
    }
  });

  fastify.decorateReply("logout", function (msg = "Successfully Logged Out", category: FlashCategory = "success") {
    const req = this.request;

    req.session.identity = undefined;
    req.session.ckey = undefined;
    req.session.perms = undefined;
    req.session.displayName = undefined;
    req.session.loginTimestamp = undefined;
    req.session._csrf = undefined;

    if (msg) req.flash(category, msg);
  });

  done();
};

export default fp(plugin, {
  name: "session",
  dependencies: ["requestcontext", "config", "database"],
});
