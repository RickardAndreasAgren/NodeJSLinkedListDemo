
import ClientAPIHelper from './Util/ClientAPIHelper';

import TranslateDirectionToImage from './Util/TranslateDirectionToImage';

import KeyInputs from './Util/KeyInputs';
import ActionControl from './Util/ActionControl';

/**********Contents****************
 variables
  const
  info
  field

StateManager
  getState
  setFocus
  attemptAction
  changeMode
  changePlacer
  initiateDelete
  initiatePlace

getters & setters
**********************************/

const arrows = {
  U: true,
  D: true,
  L: true,
  R: true,
};

const deadTile = {
  origin: '0',
  direction: '0',
  tileType: '0',
}

var password = '';
var error = '';
var placeOrMove = 'move'; // 'move' || 'place';

var focusInput = false;
var inputValue = '0';
var xpos = 9;
var ypos = 19;
var currentTile = 'I'; // I || L || T || X
var direction = 'U'; // U || D || L || R (absolute)
var origin = 'D'; // U || D || L || R (absolute)
var lock = false;
var fieldMatrix = [];
for (var i = 0; i < 19; i++) {
  var newArray = [];
  for (var j = 0; j < 19; j++) {
    newArray.push(JSON.parse(JSON.stringify(deadTile)));
  }

  fieldMatrix.push(newArray);
}
fieldMatrix[9][18] = {
  origin: 'D',
  direction: 'U',
  tileType: 'I',
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
    return setFocusInput(tof);
  },

  attemptAction: function(e) {
    if (!getLock()) {
      if (e) {
        setLock(true);
        return new Promise((resolve,reject) => {
          resolve(KeyInputs.getAction(e));
        })
        .then((actionIntention) => {
          var returner = null;
          if (actionIntention in arrows) {
            actionResult = ActionControl[getMode()](
              actionIntention,
              {
                x: getX(),
                y: getY(),
                origin: getOrigin(),
                direction: getDirection(),
                type: getCurrentTile(),
              },
              getField(),
            );
          } else {
            // . e b s
            returner = actionIntention == 'e' ? initiatePlace() :
            actionIntention == 's' ? changePlacer() :
            actionIntention == 'b' ? initiateDelete() : null;
          }
          return returner;
        }, (e) => {throw new Error('Invalid keypress')})
        .then((action) => {
          var returner = null;
          if (action == 'done') {
            returner = true;
          } else if (action == 'new') {
            setMode('place');
            // Invert exit direction
            // default to I type
          } else if (action != false) {
            // Update current info to confirm move
          }
        })
        .catch((e) => {
          console.log('Resolving action failed');
          console.log(e);
        })
      }
    }
  },


  // I || L || T || X

  changePlacer: function(points) {
    direction = points;
    switch (currentTile) {
      case 'I': {
        setCurrentTile('L');
        break;
      }
      case 'L': {
        setCurrentTile('T');
        break;
      }
      case 'T': {
        setCurrentTile('X');
        break;
      }
      case 'X': {
        setCurrentTile('I');
        break;
      }
      default: {
        break;
      }
    }
    return 'done';
  },

  initiateDelete: function() {

    return 'done';
  },

  initiatePlace: function() {

    return 'done';
  },
};

function setPassword(newPassword) {
  password = newPassword;
  return 0;
}

function getPassword() {
  return password;
}

function setMode(mode) {
  if (!mode) {
    placeOrMove = placeOrMove == 'move' ? 'place' : 'move';
  } else {
    placeOrMove = mode;
  }
  return 0;
}

function getMode() {
  return placeOrMove;
}

function setError(err) {
  error = err;
  return 0;
}

function getError() {
  return error;
}

function setFocusInput(focus) {
  focusInput = focus != focusInput ? focus : focusInput;
  return 0;
}

function getFocusInput() {
  return focusInput;
}

function setInputValue(val) {
  inputValue = val;
  return 0;
}

function getInputValue() {
  return inputValue;
}

function setX(x) {
  xpos = x;
  return 0;
}

function getX() {
  return xpos;
}

function setY(y) {
  ypos = y;
  return 0;
}

function getY() {
  return ypos;
}

// I || L || T || X
function setCurrentTile(tileType) {
  currentTile = tileType;
  return 0;
}

function getCurrentTile() {
  return currentTile;
}

// U || D || L || R (absolute)
function setDirection(dir) {
  direction = dir;
  return 0;
}

function getDirection() {
  return direction;
}

// U || D || L || R (absolute)
function setOrigin(point) {
  origin = point;
  return 0;
}

function getOrigin() {
  return origin;
}

function setLock(newLock) {
  if (!newLock) {
    lock = lock == true ? false : true;
  } else {
    lock = newLock;
  }
  return 0;
}

function getLock() {
  return lock;
}

function setField(x,y,tileUpdate) {
  fieldUpdate[x][y] = tileUpdate;
}

function getField(tile) {
  if (tile) {
    return fieldMatrix[tile.x][tile.y];
  } else {
    return fieldMatrix;
  }
}

export default StateManager;
