


module.exports = function(homedir, mainRouter, debug, linkedbackend) {

  mainRouter.get('/hello', function(req, res) {
    return res.status('200').json({ response: 'Greetings' });
  });

  mainRouter.post('/init', function(req,res) {
    return new Promise((resolve,reject) => {
      return linkedbackend.init();
    })
    .then(function(done) {
      if (!done.err) {
        res.status(200).json({action: 'Success'});
      } else {
        throw new Error(done.err);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({err: err, action: 'Failed'});
    })
  })

  mainRouter.get('/move', function(req,res) {
    return new Promise((resolve,reject) => {
      return linkedbackend.move(req.body.direction);
    })
    .then(function(done) {
      if (!done.err) {
        res.status(200).json(done);
      } else {
        throw new Error(done.err);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({err: err, action: 'Failed'});
    })
  })

  mainRouter.post('/create', function(req,res) {
    return new Promise((resolve,reject) => {
      var args = req.body;
      return linkedbackend.create(args.direction, args.type, args.entrance);
    })
    .then(function(done) {
      if (!done.err) {
        res.status(200).json(done);
      } else {
        throw new Error(done.err);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({err: err, action: 'Failed'});
    })
  })

  mainRouter.delete('/delete', function(req,res) {
    return new Promise((resolve,reject) => {
      return linkedbackend.delete(true);
    })
    .then(function(done) {
      if (!done.err) {
        res.status(200).json(done);
      } else {
        throw new Error(done.err);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({err: err, action: 'Failed'});
    })
  })

  mainRouter.get('/continue', function(req,res) {
    return new Promise((resolve,reject) => {
      return linkedbackend.continue();
    })
    .then(function(done) {
      if (!done.err) {
        res.status(200).json(done);
      } else {
        throw new Error(done.err);
      }
    })
    .catch(function(err) {
      console.log(err);
      res.status(500).json({err: err, action: 'Failed'});
    })
  })

  mainRouter.get('/js/bundle.js', function(req, res) {
    res.sendFile(homedir + '/public/js/bundle.js');
  });

  mainRouter.get('/css/index.css', function(req, res) {
    res.sendFile(homedir + '/public/css/index.css');
  });

  mainRouter.get('/css/tiles.css', function(req, res) {
    res.sendFile(homedir + '/public/css/tiles.css');
  });

  mainRouter.get('/react.js', function(req, res) {
    res.sendFile(homedir + '/node_modules/react/dist/react.js');
  });

  mainRouter.get('/react-dom.js', function(req, res) {
    res.sendFile(homedir + '/node_modules/react-dom/dist/react-dom.js');
  });

  mainRouter.get('/', function(req, res) {
    return res.sendFile(homedir + '/public/index.html');
  });

  mainRouter.get('*', function(req, res) {
    return res.sendFile(homedir + '/public/index.html');
  });

};
