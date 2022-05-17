import { requestContext } from "@fastify/request-context";
import { MikroORM } from "@mikro-orm/core";
import type { EntityManager, MariaDbDriver } from "@mikro-orm/mariadb";
import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";
// eslint-disable-next-line import/no-unresolved
import mikroOrmConfig from "../mikro-orm.config.js";

declare module "fastify" {
  interface FastifyRequest {
    readonly em: EntityManager;
  }

  interface FastifyInstance {
    readonly orm: MikroORM<MariaDbDriver>;
  }
}

const plugin: FastifyPluginAsync = async fastify => {
  const orm = await MikroORM.init<MariaDbDriver>(
    Object.assign(
      {
        logger: (message: string) => fastify.log.info(message),
      },
      mikroOrmConfig,
    ),
  );

  fastify.decorate("orm", orm);
  fastify.decorateRequest("em", {
    getter() {
      let ctx = requestContext.get("em");

      if (!ctx) {
        ctx = orm.em.fork({ useContext: true });
        requestContext.set("em", ctx);
      }

      return ctx;
    },
  });
};

export default fp(plugin, {
  name: "database",
  dependencies: ["config", "requestcontext"],
});
