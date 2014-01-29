var handlebars = require('handlebars');
handlebars.registerHelper('link_to', function() {
  return "<a href='" + this.url + "'>" + this.body + "</a>";
});

var context = { posts: [{url: "/hello-world", body: "Hello World!"},
{url: "/hello-world2", body: "Hello World2!"}] };
var source = "<ul>{{#posts}}<li>{{{link_to}}}</li>{{/posts}}</ul>"

var template = handlebars.compile(source);

console.log(template(context));

