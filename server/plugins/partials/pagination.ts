import * as eta from "eta";
import type { FastifyPluginCallback } from "fastify";
import type { PartialsOpts } from "../template.js";

const plugin: FastifyPluginCallback<PartialsOpts> = (_, opts, done) => {
  opts.templates.set(
    "pagination",
    //language=EJS
    eta.compile(`
<nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <%
      let center_page;
      if(page >= page_count - 1) {
        center_page = page_count - 2;
      } else if(page <= 2) {
        center_page = 3;   
      } else {
        center_page = page   
      }
     %>

		<% if (page > 1) { %>
			<a class="pagination-previous" href="<%= modifyQuery({page: page-1}) %>">Previous</a>
		<% } %>

		<% if (page < page_count) { %>
			<a class="pagination-next" href="<%= modifyQuery({page: page+1}) %>">Next</a>
		<% } %>

		<ul class="pagination-list">
			<li><a class="pagination-link  <%= page === 1 ? " is-current" : "" %>"  href="<%= modifyQuery({page: 1}) %>">1</a></li>

			<li><span class="pagination-ellipsis">&hellip;</span></li>

			<% if ((center_page - 1 > 1) && (center_page -1 < page_count)) { %>
				<li><a class="pagination-link <%= page === center_page - 1 ? " is-current" : "" %>" href="<%= modifyQuery({page: center_page-1}) %>"><%= center_page - 1 %></a></li>
			<% } %>

			<% if ((center_page > 1) && (center_page < page_count)) { %>
			<li><a class="pagination-link <%= page === center_page ? " is-current" : "" %>" href="<%= modifyQuery({page: center_page}) %>"><%= center_page %></a></li>
			<% } %>

			<% if ((center_page + 1 > 1) && (center_page + 1 < page_count)) { %>
				<li><a class="pagination-link <%= page === center_page + 1 ? " is-current" : "" %>" href="<%= modifyQuery({page: center_page+1}) %>"><%= center_page + 1 %></a></li>
			<% } %>

			<li><span class="pagination-ellipsis">&hellip;</span></li>

		<li><a class="pagination-link <%= page === page_count ? " is-current" : "" %>" href="<%= modifyQuery({page: page_count}) %>"><%= page_count %></a></li>
		</ul>
	</nav>
`),
  );

  done();
};

export default plugin;
