import type { FilterQuery } from "@mikro-orm/core";
import type { FastifyPluginCallback } from "fastify";
import { Loa } from "../../../dbentities/Loa.js";
import { authRoute, hasPerm } from "../../../util/index.js";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  fastify.get(
    "/",
    {
      preValidation: authRoute("loa.add"),
    },
    async (req, res) => {
      const filters: FilterQuery<Loa> = {
        expiryTime: {
          //                               dd   hh   mm   ss   milli
          $gt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        },
      };

      if (!hasPerm("loa.others")) {
        filters.ckey = req.session.ckey;
      }

      const loas = await req.em.find(Loa, filters, {
        orderBy: {
          id: "desc",
        },
      });

      return res.view("admin/loa_manager", {
        loas,
      });
    },
  );

  done();
};

export default plugin;
