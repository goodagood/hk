



'use strict';


const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "statics")));
app.use(express.static(path.join(__dirname, "node_modules")));

// Say hello!
app.get('/', (req, res) => {
    console.log(req.headers);
    console.log(JSON.stringify(req.headers));
    res.status(200).send('Hello, world! popomap');
});


app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, "statics/mapa.html"));
});
app.get('/hk', (req, res) => {
    res.sendFile(path.join(__dirname, "statics/hk.html"));
});
app.post('/hk', (req, res) => {

    console.log(req.body);
    //console.log(req.headers);
    //console.log("going to response with a json.");

    res.writeHead(200, {"Content-Type": "application/json"});

    var reply = [];
    if (req.body.location){ reply.push('location') };
    if (req.body.headers){ reply.push('headers') };
    var json = JSON.stringify(reply);
    res.end(json);
});


// socket.io
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('io on connection');

    socket.on('talk', function (data) {
        console.log('talk: ', data); // {pos: {lat: , lng:}, message: }
        socket.broadcast.emit('talk', data); 
    });

});


if (module === require.main) {
  // Start the server
    // please NOTE: server.listen INSTEAD OF app.listen for socket.io
    const appsvr = server.listen(process.env.PORT || 8080, () => {
    const port = appsvr.address().port;
    console.log(`App listening on port ${port}`);
  });
}



module.exports = server;
