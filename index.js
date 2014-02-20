var https = require("https");
var nconf = require('nconf');
var recipientHandler = require('./lib/recipient-handler');
nconf.argv().env();
nconf.file({ file: 'config.json' });

// DUMMY CONTEXT
var context = {
    template: {
        host: "localhost",
        path: "test/mail.tpl",
        auth: 'Basic ' + new Buffer(nconf.get('mailer_http_user') + ':' + nconf.get('mailer_http_pass')).toString('base64'),
        parameters: {
            weeklyUrl: "https://intern.innoq.com/blogging/weekly_statuses"
        }
    },
    recipients: {
        host: nconf.get('mailer_http_host'),
        path: nconf.get('mailer_http_path')+'groups/'+nconf.get('mailer_recipients_group')+'.json',
        auth: 'Basic ' + new Buffer(nconf.get('mailer_http_user') + ':' + nconf.get('mailer_http_pass')).toString('base64')
    }
};


var options = {
    host: context.recipients.host,
    port: 443,
    method:"GET",
    path: context.recipients.path,
    headers:{
        "Authorization": context.recipients.auth
    } 
};

console.log("Options: " + JSON.stringify(options));
https.get(options, function(res){ recipientHandler.extractRecipientList(res, context); }).on('error', function(error) {
    console.error("Error retrieving: " + error.message);
});


// var handlebars = require('handlebars');
// handlebars.registerHelper('link_to', function() {
//   return "<a href='" + this.path + "'>" + this.body + "</a>";
// });

// var source = "<ul>{{#posts}}<li>{{{link_to}}}</li>{{/posts}}</ul>"

// var template = handlebars.compile(source);

// console.log(template(context));
