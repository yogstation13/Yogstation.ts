// eslint-disable-next-line import/default
import fastifyAutoload from "@fastify/autoload";
import prettifier from "@mgcrea/pino-pretty-compact";
import config from "config";
import Fastify from "fastify";
import hyperid from "hyperid";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateId = hyperid({
  urlSafe: true,
});

const fastify = Fastify({
  logger: {
    prettyPrint: false,
    //@ts-expect-error they messed up their export somehow
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    prettifier: prettifier.default,
  },
  ignoreTrailingSlash: true,
  maxParamLength: 255,
  //1mb
  bodyLimit: 1024 * 1024,
  genReqId: () => generateId(),
  trustProxy: config.get<Array<string>>("trustProxies"),
  disableRequestLogging: true,
  ajv: {
    customOptions: {
      coerceTypes: "array",
      useDefaults: true,
    },
  },
});

//Load plugins
fastify.register(fastifyAutoload, {
  dir: join(__dirname, "plugins"),
  forceESM: true,
  encapsulate: false,
  maxDepth: 0,
});
//

//Load routes
fastify.register(fastifyAutoload, {
  dir: join(__dirname, "routes"),
  forceESM: true,
});
//

fastify.listen(config.get<number>("port"), config.get<string>("address"), err => {
  console.log(fastify.printPlugins());
  console.log(fastify.printRoutes());
  if (err) {
    fastify.log.error(err);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
});
