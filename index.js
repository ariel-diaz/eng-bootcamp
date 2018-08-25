var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send('hello');
});

app.get('/count', function(req, res) {
    const {input} = req.query;
    if(input == null || input == undefined) {
        return;
    }
    var json = convertToJson(input);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(json);
});


function convertToJson(input) { 
    var obj = {}
    input = input.trim().toLowerCase();
    input = cleanUpSpecialChars(input);
    for(var i = 0; i < input.length; i++) {
		if(obj[input[i]]) {	
			obj[input[i]] = obj[input[i]] + 1;
		} else {
			obj[input[i]] = 1;
		}
    }
    return JSON.stringify(obj);
};

function cleanUpSpecialChars(str)
{
    return str
        .replace(/[ÀÁÂÃÄÅ]/g,"A")
        .replace(/[àáâãäå]/g,"a")
        .replace(/[ÈÉÊË]/g,"E")
        .replace(/[^a-z0-9]/gi,'');
}

app.listen(4567, function() {
    console.log('Server Runing')
});