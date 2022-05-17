import { Static, Type } from "@sinclair/typebox";
import type { FastifyPluginCallback } from "fastify";
import { getFrontpageStaff } from "../../util/forums.js";

const plugin: FastifyPluginCallback = (fastify, _, done) => {
  const group = Type.Optional(
    Type.Object({
      user_group_id: Type.Integer(),
      name: Type.String(),
      priority: Type.Integer(),
      users: Type.Array(Type.String()),
    }),
  );

  const frontpageReturnType = Type.Object({
    host: group,
    council: group,
    headdev: group,
    staff: group,
  });
  fastify.get<{
    Reply: Static<typeof frontpageReturnType>;
  }>(
    "/frontpage_staff",
    {
      schema: {
        response: {
          200: frontpageReturnType,
        },
      },
    },
    (req, res) => {
      res.cacheControl("public").cacheControl("max-age", 15 * 60);
      return getFrontpageStaff();
    },
  );

  done();
};

export default plugin;
