import * as eta from "eta";
import type { FastifyPluginCallback } from "fastify";
import type { PartialsOpts } from "../template.js";

const plugin: FastifyPluginCallback<PartialsOpts> = (_, opts, done) => {
  opts.templates.set(
    "searchForm",
    //language=ejs
    eta.compile(`
<% param(default_value) %>
<% param(placeholder_text) %>

<form id="search-form">
		<div class="field">
			<div class="control has-icons-left">
				<input name="query" class="input" type="text"
					placeholder="<%= placeholder_text %>"
					<% if(default_value) { %>
					value="<%= default_value %>"
					<% } %>
				/>
				<span class="icon is-small is-left">
					<i class="fas fa-search"></i>
				</span>
			</div>
		</div>
	</form>
`),
  );

  done();
};

export default plugin;
