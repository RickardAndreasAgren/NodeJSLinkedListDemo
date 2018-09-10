


module.exports = function(homedir, router, debug, linkedbackend) {

  router.get('/hello', function(req, res) {
    return res.status('200').json({ response: 'Greetings' });
  });

  router.post('/init', function(req,res) {
    console.log('INIT')
    new Promise((resolve,reject) => {
      resolve(linkedbackend.init());
    })
    .then(function(done) {
      console.log(done);
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

  router.get('/js/bundle.js', function(req, res) {
    res.sendFile(homedir + '/public/js/bundle.js');
  });

  router.get('/css/index.css', function(req, res) {
    res.sendFile(homedir + '/public/css/index.css');
  });

  router.get('/css/tiles.css', function(req, res) {
    res.sendFile(homedir + '/public/css/tiles.css');
  });

  router.get('/react.js', function(req, res) {
    res.sendFile(homedir + '/node_modules/react/dist/react.js');
  });

  router.get('/react-dom.js', function(req, res) {
    res.sendFile(homedir + '/node_modules/react-dom/dist/react-dom.js');
  });

  router.get('/', function(req, res) {
    return res.sendFile(homedir + '/public/index.html');
  });

  router.get('*', function(req, res) {
    return res.sendFile(homedir + '/public/index.html');
  });

};
