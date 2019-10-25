



'use strict';


const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "statics")));

// [START hello_world]
// Say hello!
app.get('/', (req, res) => {
    console.log(req.headers);
    console.log(JSON.stringify(req.headers));
    res.status(200).send('Hello, world! popomap');
});
// [END hello_world]


app.get('/map', (req, res) => {
    res.sendFile(path.join(__dirname, "statics/mapa.html"));
});
app.get('/hk', (req, res) => {
    res.sendFile(path.join(__dirname, "statics/hk.html"));
});
app.post('/hk', (req, res) => {

    console.log(req.body);
    console.log(req.headers);
    console.log("going to response with a json.");

    res.writeHead(200, {"Content-Type": "application/json"});

    var reply = [];
    if (req.body.location){ reply.push('location') };
    if (req.body.headers){ reply.push('headers') };
    var json = JSON.stringify(reply);
    res.end(json);
});


if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
