// Copyright 2018, Google LLC.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';


const express = require('express');

const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({"extended":true}));
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
app.get('/submit', (req, res) => {
    res.sendFile(path.join(__dirname, "statics/form1.html"));
});
app.post('/submit', (req, res) => {
    console.log({
        name: req.body.name,
        msg:  req.body.message
    });
    res.send("msg console logged");
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
