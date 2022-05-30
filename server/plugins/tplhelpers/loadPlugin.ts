import type { AstObject } from "eta/dist/types/parse.js";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import type { TemplateHelperOpts } from "../template.js";

const plugin: FastifyPluginCallback<TemplateHelperOpts> = (_, opts, done) => {
  const paramRegex = /^param\s*\(\s*([^]*)\s*\)\s*$/;

  opts.plugins.push({
    processFnString: (fn: string) => {
      return fn.replace(
        "function layout",
        `
var __nextParam=0;
var load = tpl => {
  var ltpl=it[Symbol.for('loadPlugin')](tpl);
  it[tpl] = (...data) => ltpl(
    Object.assign(it,{
      args: data
    }),
    E
  )
};
function layout`,
      );
    },
    processAST: (ast: Array<AstObject>) => {
      for (const token of ast) {
        //Make sure it's a template object
        // noinspection SuspiciousTypeOfGuard
        if (typeof token === "string") continue;
        //Make sure it's an evaluate tag
        if (token.t !== "e") continue;

        const val = token.val.trim();
        //Its a @content "name"
        if (paramRegex.test(val)) {
          // eslint-disable-next-line
          const paramName = paramRegex.exec(val)![1].replaceAll(/\W/g, "");
          token.val = `it["${paramName}"] = it["args"][__nextParam++];`.replace(/\s/g, "");
        }
      }

      return ast;
    },
  });
  opts.ctx[Symbol.for("loadPlugin")] = opts.getTpl;

  done();
};

export default fp(plugin, {
  name: "tplload",
  dependencies: ["tplcontext", "tplslot"],
});
