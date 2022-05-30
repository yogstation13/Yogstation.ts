import * as eta from "eta";
import type { FastifyPluginCallback } from "fastify";
import type { PartialsOpts } from "../template.js";

const plugin: FastifyPluginCallback<PartialsOpts> = (_, opts, done) => {
  opts.templates.set(
    "validation",
    //language=EJS
    eta.compile(`
        <ul class="errors">
            <% for(const errors of Object.values(getValidationErrors())) { %>
                <% // noinspection JSCheckFunctionSignatures
                   for(const [field, error] of Object.entries(errors)) { %>
                    <div class="message is-danger mb-3">
                        <div class="message-body py-2 my-0">
                            <span class="is-capitalized"><%= field %></span> <%-= error %>
                        </div>
                    </div>
                <% } %>
            <% } %>
        </ul>
    `),
  );

  done();
};

export default plugin;
