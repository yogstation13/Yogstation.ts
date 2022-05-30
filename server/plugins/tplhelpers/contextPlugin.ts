import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import type { TemplateHelperOpts } from "../template.js";

//Call "include" with "it" by default unless overwritten
const plugin: FastifyPluginCallback<TemplateHelperOpts> = (_, opts, done) => {
  opts.plugins.push({
    processFnString: (fnStr: string) => {
      return fnStr.replace("E.include.bind(E)", "(tpl,data)=>data?E.include.call(E,tpl,data):E.include.call(E,tpl,it)");
    },
  });

  done();
};

export default fp(plugin, {
  name: "tplcontext",
});
