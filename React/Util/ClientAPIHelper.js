
import ObjectToFormdata from 'object-to-formdata';

var ClientAPIHelper = {

  buildParams: function (prefix, obj, add) {
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

  makeQueryPromise: function (a) {
    return new Promise((resolve, reject) => {

      var prefix, s, add, name, r20, output;
      s = [];
      r20 = /%20/g;
      add = function (key, value) {
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

  promisedSend: function (args) {

      var data = args.data;
      console.log('Prep: ', args);
      var anHttpRequest = args.xhr;

      return new Promise(function (resolve, reject) {

            anHttpRequest.onreadystatechange = function () {

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

  dataRequestPromise: function (method, target, data) {
    var helper = this;
    return new Promise((resolve, reject) => {
      var request = new XMLHttpRequest();
      request.open(method, target, true);
      request.setRequestHeader('Content-Type',
      'application/x-www-form-urlencoded');
      resolve({
        xhr: request, method: method,
        target: target, data: data,
        fileData: false,
      });
    })
    .then(function (argblob) {
      return helper.prepareRequestPromise(argblob);
    })
    .then(function (argblob) {
      return helper.promisedSend(argblob);
    });
  },

  prepareRequestPromise: function (argblob) {
    var helper = this;
    return new Promise((resolve, reject) => {

      argblob.xhr.setRequestHeader('Accept', 'text/html');
      if (argblob.fileData) {
        new Promise((resolveInner, rejectInner) => {
          //Check sync on argblob.data
          resolveInner(objectToFormData(argblob.data));
        })
        .then(function (sendData) {
          console.log('SendData', sendData);
          resolve({ xhr: argblob.xhr, data: sendData });
        });
      } else {
        helper.makeQueryPromise(argblob.data)
        .then(function (sendData) {
          console.log('SendData', sendData);
          resolve({ xhr: argblob.xhr, data: sendData });
        });
      }
    });
  },
};

export default ClientAPIHelper;
