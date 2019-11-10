
const http = require('http');
const fs = require('fs');

const express = require('express');

const hostname = '127.0.0.1';
const port = 8080;

const app = express();

app.use(express.static('./')); //serve all file in current folder

app.get('/', (req, res) => {
    console.log(req['headers']);
    res.send('Hello All files block chain!' + JSON.stringify(req['headers']))
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getIP(req){ 
    // get IP from node.js request obj
    var ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    return ip;
}

//// primary HTTP server
//var server = http.createServer((req, res) => {
//  res.statusCode = 200;
//  res.setHeader('Content-Type', 'text/plain');
//  res.end('Hello World\n');
//});
//server.listen(port, hostname, () => {
//  console.log(`Server running at http://${hostname}:${port}/`);
//});

//serve static file with bare node.js
//http.createServer(function (req, res) {
//  fs.readFile(__dirname + req.url, function (err,data) {
//    if (err) {
//      res.writeHead(404);
//      res.end(JSON.stringify(err));
//      return;
//    }
//    res.writeHead(200);
//    res.end(data);
//  });
//});
