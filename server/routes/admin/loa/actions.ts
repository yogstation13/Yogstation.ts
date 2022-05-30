import type { FilterQuery } from "@mikro-orm/core";
import { Static, Type } from "@sinclair/typebox";
import type { FastifyPluginCallback } from "fastify";
import { Loa } from "../../../dbentities/Loa.js";
import type { ArrowRouteHandler } from "../../../types/util.js";
import { authRoute, ckeyPattern, hasPerm } from "../../../util/index.js";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  const addLoaBody = Type.Object({
    reason: Type.String({
      maxLength: 2048,
      minLength: 1,
    }),
    expiration_time: Type.String({
      format: "date",
    }),
    ckey: Type.String({
      pattern: ckeyPattern,
    }),
  });

  const getLoasHandler: ArrowRouteHandler = async (req, res) => {
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
  };

  fastify.get("/", {
    preValidation: authRoute("loa.add"),
    handler: getLoasHandler,
  });

  fastify.post<{
    Body: Static<typeof addLoaBody>;
  }>("/", {
    schema: {
      body: addLoaBody,
    },
    attachValidation: true,
    preValidation: authRoute("loa.add"),
    handler: async (req, res) => {
      const ckey = hasPerm("loa.others") ? req.body.ckey : req.session.ckey!;
      await req.em.persistAndFlush(
        req.em.create(Loa, {
          ckey,
          time: new Date(),
          expiryTime: new Date(req.body.expiration_time),
          reason: req.body.reason,
        }),
      );
      req.flash("success", "Successfully Set LOA");

      return getLoasHandler(req, res);
    },
  });

  enum editLoaActions {
    revoke = "revoke",
  }

  const editLoaParams = Type.Object({
    loa_id: Type.Integer(),
    action: Type.Enum(editLoaActions),
  });
  fastify.post<{
    Params: Static<typeof editLoaParams>;
  }>(
    "/:loa_id/:action",
    {
      schema: {
        params: editLoaParams,
      },
      preValidation: authRoute("loa.add"),
    },
    async (req, res) => {
      const loa = await req.em.findOne(Loa, req.params.loa_id);
      if (!loa) {
        return res.notFound("LOA not found");
      }

      if (loa.ckey.ckey !== req.session.ckey && !hasPerm("loa.others")) {
        return res.forbidden("Attempting to edit someone else's LOA");
      }

      if (req.params.action === editLoaActions.revoke) {
        loa.revoked = true;
        await req.em.flush();

        req.flash("success", "Successfully Revoked LOA");
      }

      res.redirect("/admin/loa");
    },
  );

  done();
};

export default plugin;
