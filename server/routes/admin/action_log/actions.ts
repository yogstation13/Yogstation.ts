import type { FilterQuery } from "@mikro-orm/core";
import { Static, Type } from "@sinclair/typebox";
import config from "config";
import type { FastifyPluginCallback } from "fastify";
import { ActionLog } from "../../../dbentities/ActionLog.js";
import { authRoute } from "../../../util/index.js";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  const actionLogQS = Type.Object({
    page: Type.Integer({ default: 1 }),
    query: Type.String({ default: "" }),
  });
  const ipp = parseInt(config.get<string>("itemsPerPage"));

  fastify.get<{
    Querystring: Static<typeof actionLogQS>;
  }>(
    "/",
    {
      preValidation: authRoute("action_log.access"),
      schema: {
        querystring: actionLogQS,
      },
    },
    async (req, res) => {
      const { query: search_query, page } = req.query;

      const filters: FilterQuery<ActionLog>[] = [];
      if (search_query) {
        filters.push({
          adminid: search_query,
        });
        filters.push({
          target: search_query,
        });
        filters.push({
          description: {
            $like: `%${search_query}%`,
          },
        });
      }
      const [items, count] = await req.em.findAndCount(
        ActionLog,
        {
          $or: filters,
        },
        {
          orderBy: {
            id: "desc",
          },
          limit: ipp,
          offset: (page - 1) * ipp,
        },
      );

      return res.view("admin/action_log", {
        action_log: items,
        page: page,
        page_count: Math.ceil(count / ipp),
        search_query: search_query,
      });
    },
  );

  done();
};

export default plugin;
