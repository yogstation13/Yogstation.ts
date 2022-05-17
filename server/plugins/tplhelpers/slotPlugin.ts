// eslint-disable-next-line node/no-missing-import
import type { EtaConfig } from "eta/dist/types/config";
// eslint-disable-next-line node/no-missing-import
import type { AstObject } from "eta/dist/types/parse";
import type { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import type { TemplateHelperOpts } from "../template.js";

const contentRegex = /^content\s*\(\s*"([^]*)"\s*\)\s*\${$/;
const slotRegex = /^slot\s*\(\s*"([^]*)"\s*\)(\s*\${)?$/;
const plugin: FastifyPluginCallback<TemplateHelperOpts> = (_, opts, done) => {
  opts.plugins.push({
    processFnString: (fnStr: string) => {
      return `it[Symbol.for("slotsPlugin")]=it[Symbol.for("slotsPlugin")]||{};${fnStr}`;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    processAST: (ast: Array<AstObject>, _env: EtaConfig) => {
      for (const token of ast) {
        //Make sure it's a template object
        // noinspection SuspiciousTypeOfGuard
        if (typeof token === "string") continue;
        //Make sure it's an evaluate tag
        if (token.t !== "e") continue;

        const val = token.val.trim();
        //Its a @content "name"
        if (contentRegex.test(val)) {
          // eslint-disable-next-line
          const slotName = "_" + contentRegex.exec(val)![1].replaceAll(/\W/g, "");
          token.val = `
          it[Symbol.for("slotsPlugin")]["${slotName}"] = tR;
          tR = "";
          ___slot${slotName}();
          [tR, it[Symbol.for("slotsPlugin")]["${slotName}"]] = [it[Symbol.for("slotsPlugin")]["${slotName}"], tR.trim()];
          function~___slot${slotName} () {
        `
            .replace(/\s/g, "")
            .replace("~", " ");
        } else if (slotRegex.test(val)) {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const match = slotRegex.exec(val)!;
          const slotName = "_" + match[1].replaceAll(/\W/g, "");
          const hasDefault = Boolean(match[2]);
          token.val = `
          if(it[Symbol.for("slotsPlugin")]["${slotName}"]) {
            tR += it[Symbol.for("slotsPlugin")]["${slotName}"];
          } ${
            hasDefault
              ? `
              else {
                ___slotdefault${slotName}() ?? "";
              }
          
              function~___slotdefault${slotName} () {`
              : ""
          }
          `
            .replace(/\s/g, "")
            .replace("~", " ");
        }
      }

      return ast;
    },
  });

  done();
};

export default fp(plugin, {
  name: "tplslot",
});
