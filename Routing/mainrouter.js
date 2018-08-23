
module.exports = function (homedir, mainRouter, debug, password) {

  mainRouter.get('/hello', function (req, res) {
    return res.status('200').json({ response: 'Greetings' });
  });

  mainRouter.get('/js/bundle.js', function (req, res) {
    res.sendFile(homedir + '/public/js/bundle.js');
  });

  mainRouter.get('/react.js', function (req, res) {
    res.sendFile(homedir + '/node_modules/react/dist/react.js');
  });

  mainRouter.get('/react-dom.js', function (req, res) {
    res.sendFile(homedir + '/node_modules/react-dom/dist/react-dom.js');
  });

  mainRouter.get('/', function (req, res) {
    return res.sendFile(homedir + '/public/index.html');
  });

  mainRouter.get('*', function (req, res) {
    return res.sendFile(homedir + '/public/index.html');
  });

};
