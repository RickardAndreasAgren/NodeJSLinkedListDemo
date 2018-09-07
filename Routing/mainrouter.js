


module.exports = function(homedir, mainRouter, debug, password, linkedbackend) {

  mainRouter.get('/hello', function(req, res) {
    return res.status('200').json({ response: 'Greetings' });
  });

  mainRouter.get('/move', function(req,res) {

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
