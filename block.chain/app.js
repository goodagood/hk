

'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const db = require('./db.js');
const p = console.log;

const express = require('express');

const port = 8080;

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//app.use(express.static('./')); //serve all file in current folder
app.use(express.static(path.join(__dirname, "statics")));
app.use(express.static('/my/outside'));

var srvData = {};
prepare(srvData);

app.get('/', (req, res) => {
    console.log(req['headers']);
    res.send(getIP(req) + JSON.stringify(req['headers']))
});


app.post('/json', (req, res) => {

    //console.log(req.body);
    //console.log(req.headers);

    // req.body is the json request
    db.jsonAction(req.body, function(err, replyData){
        p('callbacked ', replyData);
        res.writeHead(200, {"Content-Type": "application/json"});

        var jsonStr = JSON.stringify(replyData);
        res.end(jsonStr);
    }); 

});



app.listen(port, () => console.log(`serve root file listening on port ${port}!`));

function getIP(req){ 
    // get IP from node.js request obj
    var ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    return ip;
}


function prepare(dataObj){
    // prepare for server
    db.insertSrvPem(function(err, serverKey){
        if(err) {return p('insert srv pem err', err);}

        dataObj['server.key'] = serverKey;
    });
}


