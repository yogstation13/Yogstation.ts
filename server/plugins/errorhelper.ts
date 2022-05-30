import { requestContext } from "@fastify/request-context";
import Axios from "axios";
import type { AxiosError } from "axios";
import type { FastifyError, FastifyPluginAsync, FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import fastifyHttpErrors from "fastify-http-errors-enhanced";
import fp from "fastify-plugin";
import type { Server } from "http";
import { getValidations } from "../util/index.js";

let devPage: FastifyPluginCallback<FastifyPluginOptions, Server>;
try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,node/no-unsupported-features/es-syntax
  //devPage = await import("fastify-error-page");
  // eslint-disable-next-line no-empty
} catch (e) {}

const plugin: FastifyPluginAsync = async fastify => {
  if (devPage) {
    await fastify.register(devPage);
  } else {
    await fastify.register(fastifyHttpErrors, {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
      handler: (req, res, error, originalError) => {
        if (typeof originalError.stack === "object") originalError.stack = (originalError.stack as unknown as string[]).join("\n\t");
        if (res.statusCode < 500) {
          res.log.info({ req: req, res: res, err: originalError }, originalError && originalError.message);
        } else {
          res.log.error({ req: req, res: res, err: originalError }, originalError && originalError.message);
        }

        res.vary("accept");
        if (req.headers.accept?.includes("application/json")) return false;

        res.view("error", {
          error: error,
        });
        return true;
      },
      /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
    });
  }

  const oldHandler = fastify.errorHandler;
  fastify.setErrorHandler((err, req, res) => {
    if ((err as unknown) instanceof Axios.AxiosError) {
      //I can't be assed to make it work properly
      // eslint-disable-next-line
      const json = (err as AxiosError).toJSON() as any;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (json?.config?.headers && json?.config?.headers["XF-Api-Key"] !== undefined) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        json.config.headers["XF-Api-Key"] = "***";
      }
      return oldHandler(json as FastifyError, req, res);
    }

    return oldHandler(err, req, res);
  });

  fastify.addHook("preHandler", (req, res, done) => {
    const validations = getValidations(req);
    if (validations) res.status(400);
    //requestContext.set("validationErrors", validations);
    requestContext.set("validationErrors", validations ?? {});
    done();
  });
};

export default fp(plugin, {
  name: "errorhelper",
  dependencies: ["template"],
});
