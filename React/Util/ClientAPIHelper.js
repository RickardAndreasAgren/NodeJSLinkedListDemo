
/* Endpoints:
  init
  move direction
  create direction, type, entrance
  delete
  continue
*/

const ClientAPIHelper = {

  buildParams: function(prefix, obj, add) {
    var name, i, l, rbracket;
    rbracket = /\[\]$/;
    if (obj instanceof Array) {
      for (i = 0, l = obj.length; i < l; i++) {
        if (rbracket.test(prefix)) {
          add(prefix, obj[i]);
        } else {
          this.buildParams(prefix + '[' + (typeof obj[i] === 'object' ? i : '')
          + ']', obj[i], add);
        }
      }
    } else if (typeof obj == 'object') {
      // Serialize object item.
      for (name in obj) {
        this.buildParams(prefix + '[' + name + ']', obj[name], add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  },

  makeQueryPromise: function(a) {
    return new Promise((resolve, reject) => {

      var prefix, s, add, name, r20, output;
      s = [];
      r20 = /%20/g;
      add = function(key, value) {
        // If value is a function, invoke it and return its value
        value = (typeof value == 'function') ? value() :
        (value == null ? '' : value);
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };

      if (a instanceof Array) {
        for (name in a) {
          add(name, a[name]);
        }
      } else {
        for (prefix in a) {
          this.buildParams(prefix, a[prefix], add);
        }
      }

      output = s.join('&').replace(r20, '+');
      resolve(output);
    });
  },

  promisedSend: function(args) {

      var data = args.data;
      console.log('Prep: ', args);
      var anHttpRequest = args.xhr;

      return new Promise(function(resolve, reject) {

            anHttpRequest.onreadystatechange = function() {

                  if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200) {
                    // Console.log(anHttpRequest.responseText);
                    if (anHttpRequest.responseText &&
                      anHttpRequest.responseText[0] == '{') {
                      var json = JSON.parse(anHttpRequest.responseText);
                      resolve(json);
                    } else if (anHttpRequest.responseText) {
                      console.log('<CAHissue: notJSON>');
                      console.log(anHttpRequest.responseText);
                      reject({ err: anHttpRequest.responseText });
                    } else {
                      console.log('<successHTTP>');
                      console.log(anHttpRequest);
                      resolve({ ok: '200' });
                    };
                  } else if (anHttpRequest.readyState == 4 && anHttpRequest.status == 500) {
                    if (anHttpRequest.responseText &&
                      anHttpRequest.responseText[0] == '{') {
                      var json = JSON.parse(anHttpRequest.responseText);
                      resolve(json);
                    } else if (anHttpRequest.responseText) {
                      console.log('<CAHissue: notJSON>');
                      console.log(anHttpRequest.responseText);
                      reject({ err: anHttpRequest.responseText });
                    } else {
                      console.log('<successHTTP>');
                      console.log(anHttpRequest);
                      resolve({ ok: '200' });
                    };
                  }
                };

            anHttpRequest.send(data);
          }
        );
    },

  // Call method, path target, object data

  dataRequestPromise: function(method, target, data) {
    console.log('Starting request promise chain');
    var helper = this;
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(method, target, true);
      request.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
      resolve({
        xhr: request,
        data: data,
      });
    })
    .then(function(argblob) {
      console.log(argblob);
      console.log('Preparing request data');
      return helper.prepareRequestPromise(argblob.xhr, argblob.data);
    })
    .then(function(argblob) {
      console.log(argblob);
      console.log('Calling send');
      return helper.promisedSend(argblob);
    });
  },

  prepareRequestPromise: function(request, data) {
    var helper = this;
    return new Promise((resolve, reject) => {
      request.setRequestHeader('Accept', 'text/html');
      resolve(helper.makeQueryPromise(data));
    })
    .then(function(sendData) {
      console.log('SendData', sendData);
      return {xhr: request, data: sendData };
    });
  },

  init: function() {
    return this.dataRequestPromise('POST','/init',0);
  },

  move: function(data) {
    return this.dataRequestPromise('POST','/move',data);
  },

  create: function(data) {
    return this.dataRequestPromise('POST','/create',data);
  },

  delete: function(data) {
    return this.dataRequestPromise('DELETE','/delete',0);
  },

  continue: function(data) {
    return this.dataRequestPromise('POST','continue',data);
  },
};

export default ClientAPIHelper;
