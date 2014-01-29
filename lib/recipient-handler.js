/**
 * Created by ahe on 29/01/14.
 */

exports.extractRecipientList = function(res, context) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
        console.log("data: " + data);
        responseString += data;
    });

    res.on('end', function() {
        if (res.statusCode != 200) {
            return new Error(responseString);
        }
        var responseObject = JSON.parse(responseString);
        console.log(responseObject['member']);
        context.recipients.list = responseObject['member'];
    });

}

