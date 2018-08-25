"# eng-camp-exercice" 
var express = require('express');
var app = express();

app.get('/count', function(req, res) {
    const {input} = req.query;
    var json = convertToJson(input);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(json);
});


function convertToJson(input) { 
    console.log(input);
    var json = [];
    for(var i = 0; i < input.length; i++) {
        console.log(json);
        console.log(input[i]);
        var obj = {}
        if(json.includes(input[i])) {
            obj[input[i]] = json[input[i]] + 1;
        } else {
            obj[input[i]] = 1;
        }
        json.push(obj)
    }
    return JSON.stringify(json);
};

app.listen(4567, function() {
    console.log('Server Runing')
});