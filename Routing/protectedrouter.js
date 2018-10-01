
module.exports = function(homedir, router, debug, linkedbackend) {

  router.post('/move', function(req,res) {
    new Promise((resolve,reject) => {
      resolve(linkedbackend.move(req.body.direction, req.body.target));
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

  router.post('/create', function(req,res) {
    new Promise((resolve,reject) => {
      var args = req.body;
      console.log(args);
      resolve(linkedbackend.create(args.direction, args.type, args.entrance));
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

  router.delete('/delete', function(req,res) {
    new Promise((resolve,reject) => {
      resolve(linkedbackend.delete(true));
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

  router.post('/continue', function(req,res) {
    new Promise((resolve,reject) => {
      resolve(linkedbackend.continue());
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
}
