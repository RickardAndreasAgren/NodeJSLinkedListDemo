
const http = require('http');

const express = require('express');

const app = express();

const bodyparser = require('body-parser');

const cts = require('./constants')();

const LinkedInterface = require('./LinkedList/LinkedInterface');

var mainRouter = express.Router();
var protectedRouter = express.Router();

var serverState = LinkedInterface;
serverState.init();

app.use(bodyparser.urlencoded({ extended: false }))

require('./Routing/mainrouter')(__dirname, mainRouter, cts.DEBUG, serverState);

require('./Routing/protectedrouter')(__dirname, protectedRouter, cts.DEBUG,
  serverState);

app.use(mainRouter);

app.use(function(req,res,next) {
  if (req.body.password == cts.PASSWORD) {
    next();
  } else {
    res.status(200).json({err: 'Invalid password'});
  }
});

app.use(protectedRouter);

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
