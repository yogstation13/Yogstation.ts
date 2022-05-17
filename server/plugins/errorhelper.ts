import Axios from "axios";
import type { AxiosError } from "axios";
import type { FastifyError, FastifyPluginAsync, FastifyPluginCallback, FastifyPluginOptions } from "fastify";
import fastifyHttpErrors from "fastify-http-errors-enhanced";
import fp from "fastify-plugin";
import type { Server } from "http";

let devPage: FastifyPluginCallback<FastifyPluginOptions, Server>;
try {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,node/no-unsupported-features/es-syntax,node/no-unpublished-import
  //devPage = await import("fastify-error-page");
  // eslint-disable-next-line no-empty
} catch (e) {}

const plugin: FastifyPluginAsync = async (fastify, _) => {
  if (devPage) {
    await fastify.register(devPage);
  } else {
    await fastify.register(fastifyHttpErrors);
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
};

export default fp(plugin, {
  name: "errorhelper",
  dependencies: ["sensible"],
});
