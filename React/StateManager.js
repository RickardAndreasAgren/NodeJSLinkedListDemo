
import TranslateDirectionToImage from './Util/TranslateDirectionToImage';

import KeyInputs from './Util/KeyInputs';
import ActionControl from './Util/ActionControl';

// Current pos, field state, event function
// InfoContainer: pw, error, mode

const arrows = {
  u: true,
  d: true,
  l: true,
  r: true,
};

var focusInput = false;
var inputValue = '0';
var xpos = 9;
var ypos = 9;
var currentTile = 'I'; // I || L || T || X
var direction = 'U'; // U || D || L || R
var origin = 'D'; // U || D || L || R
var password = '';
var error = '';
var placeOrMove = 'move'; // 'move' || 'place';
var lock = false;
var fieldMatrix = [];
for (var i = 0; i < 19; i++) {
  var newArray = [];
  for (var j = 0; i < 19; i++) {
    newArray.push('0');
  }

  fieldMatrix.push(newArray);
}

// 20px tile minimum

const StateManager = {
  getState: function() {
    return {
      field: {
        pos: { xpos, ypos },
        gridField: fieldMatrix,
      },
      info: {
        pw: password,
        err: error,
        mode: placeOrMove,
      },
      keyField: inputValue,
      focusOn: focusInput,
    };
  },

  setFocus: function(tof) {
    focusInput = tof;
    console.log('SMSF', tof);
    return 0;
  },

  attemptAction: function(e) {
    if (!lock) {
      if (e) {
        return new Promise((resolve,reject) => {
          resolve(KeyInputs.getAction(e));
        })
        .then((actionIntention) => {
          var returner = null;
          if (actionIntention in arrows) {
            returner = ActionControl[type](
              actionIntention,
              {
                x: xpos,
                y: ypos,
                origin: origin,
                direction: direction,
              },
              currentTile,
              fieldMatrix,
            );
          } else {
            // . e b s
            returner = actionIntention == 'e' ? initiatePlace() :
            actionIntention == 's' ? changePlacer() :
            actionIntention == 'b' ? initiateDelete() : null;
          }
          return returner;
        }, (e) => {throw new Error('Invalid keypress')})
        .catch((e) => {
          console.log('Resolving action failed');
          console.log(e);
        })
      }
    }
  },

  changeMode: function() {
    placeOrMove = placeOrMove == 'place' ? 'move' : 'place';
    return true;
  },

  // I || L || T || X

  changePlacer: function(points) {
    direction = points;
    switch (currentTile) {
      case 'I': {
        currentTile = 'L';
        break;
      }
      case 'L': {
        currentTile = 'T';
        break;
      }
      case 'T': {
        currentTile = 'X';
        break;
      }
      case 'X': {
        currentTile = 'I';
        break;
      }
      default: {
        break;
      }
    }
    return true;
  },

  initiateDelete: function() {

  },

  initiatePlace: function() {

  },
};

export default StateManager;
