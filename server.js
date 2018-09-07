
const http = require('http');

const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const cts = require('./constants')();

const LinkedList = require('./LinkedList/LinkedList');

var mainRouter = express.Router();

var serverState = new LinkedList();

require('./Routing/mainrouter')(__dirname, mainRouter, cts.DEBUG, cts.PASSWORD,
  );

app.use(bodyparser);

app.use(mainRouter);

app.use(function(err, req, res, next) {
    if (err) {
      console.log('500 middleware triggered. There was a server error.');
      res.json({ msg: err.message });
      res.status(err.status || 500).end();
    } else {
      next();
    }
  }
);

console.log('Application running on port ' + cts.PORT);

var server = http.createServer(app);

server.listen(cts.PORT);
