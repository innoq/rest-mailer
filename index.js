var https = require("https");
var nconf = require('nconf');
var mail = require('mail');

nconf.argv().env();
nconf.file({ file: 'config.json' });

mail.Mail({
  host: nconf.get('mailer_smtp_host'),
  username: nconf.get('mailer_smtp_user'),
  password: nconf.get('mailer_smtp_pass')
});

console.log(JSON.stringify(mail));

var auth = 'Basic ' + new Buffer(nconf.get('mailer_http_user') + ':' + nconf.get('mailer_http_pass')).toString('base64');

var options = {
    host: nconf.get('mailer_http_host'),
    port: 443,
    method:"GET",
    path: nconf.get('mailer_http_path')+'groups/jboss.json',
    headers:{
        "Authorization": auth
    } 
};

https.get(options, function(res) {
	res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var responseObject = JSON.parse(responseString);
            console.log(responseObject['member']);
    });
});


// var handlebars = require('handlebars');
// handlebars.registerHelper('link_to', function() {
//   return "<a href='" + this.url + "'>" + this.body + "</a>";
// });

// var context = { posts: [{url: "/hello-world", body: "Hello World!"},
// {url: "/hello-world2", body: "Hello World2!"}] };
// var source = "<ul>{{#posts}}<li>{{{link_to}}}</li>{{/posts}}</ul>"

// var template = handlebars.compile(source);

// console.log(template(context));
