
import ClientAPIHelper from './Util/ClientAPIHelper';

import KeyInputs from './Util/KeyInputs';
import ActionControl from './Util/ActionControl';

import TileMath from './Util/TileMath';

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

const directions = {
  U: {i: -1, a: 'Y', x: 0, y: -1},
  D: {i: 1, a: 'Y', x: 0, y: 1},
  R: {i: 1, a: 'X', x: 1, y: 0},
  L: {i: -1, a: 'X', x: -1, y: 0},
};

const deadTile = {
  origin: '0',
  direction: '0',
  tileType: 'e',
}

var password = '';
var error = '';
var placeOrMove = 'move'; // 'move' || 'place';

var focusInput = false;
var inputValue = '0';
var forceUpdate = false;

var xpos = 9;
var ypos = 18;
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
  null;
  fieldMatrix.push(newArray);
}

fieldMatrix[9][18] = {
  origin: 'D',
  direction: 'U',
  tileType: 'I',
}

const StateManager = {
  getState: function() {
    return getAppState();
  },

  setFocus: function(tof) {
    return setFocusInput(tof);
  },

  toggleForceUpdate: function(fu) {
    return setForceUpdate(fu);
  },

  attemptAction: function(e, callback) {
    if (!getLock()) {
      if (e) {
        setLock(true);
        return new Promise((resolve,reject) => {
          resolve(KeyInputs.getAction(e));
        })
        .then((actionIntention) => {
          console.log('intent');
          console.log(actionIntention);
          var returner = null;
          if (actionIntention in directions) {
            returner = ActionControl[getMode()](
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
            returner = actionIntention == 'e' ? this.initiatePlace() :
            actionIntention == 's' ? this.changePlacer() :
            actionIntention == 'b' ? this.initiateDelete() :
            actionIntention == 't' ? this.changeMode() : false;
          }
          console.log(returner);
          return returner;
        }, (e) => {console.log(e);
          throw new Error('Invalid keypress')})
        .then((action) => {
          var returner;
          var moveActions = {
            U: true,
            D: true,
            L: true,
            R: true,
          };
          console.log(action);
          if (action == 'done') {
            returner = true;
          } else if (action in moveActions) {
            console.log('Move to empty tile');
            // Update move to empty slot
            returner = this.changeSelectEmpty(action);
          } else if (action != false) {
            console.log('Move to existing tile');
            // Update current info to confirm move
            returner = this.changeSelectExist(action);
          }
          return returner;
        })
        .then(function(alldone) {
          setLock(false);
          console.log('Fire update');
          console.log(alldone);
          if (alldone) {
            callback();
          } else {
            throw new Error('Action malfunction');
          }
        })
        .catch((e) => {
          console.log('Resolving action failed');
          console.log(e);
        })
      }
    }
    return false;
  },


  changeSelectEmpty: function(intent) {
    console.log('Moving to empty tile');
    return new Promise((resolve,reject) => {
      resolve(setMode('place'));
    })
    .then(function(done) {
      return setOrigin(TileMath.getDirection(
        TileMath.minus(TileMath.getNumber(intent), 2)
      ));
    })
    .then(function(done) {
      console.log(intent);
      setDirection(intent);
      var change = directions[intent];
      setX(change.x + getX());
      setY(change.y + getY());
      console.log(getX());
      console.log(getY());
      let returner = setCurrentTile('I');
      return returner;
    })
    .then(function(beO) {
      var returner = null;
      if (beO == 0) {
        returner = true;
      } else {
        returner = false;
      }
      return returner;
    })
    .catch(function(err) {
      console.log('Failed to move to empty tile');
      console.log(err);
    })
  },

  changeSelectExist: function(intent) {
    console.log('Moving to active tile');
    return new Promise((resolve,reject) => {
      resolve(setMode('move'));
    })
    .then(function(done) {
      var change = directions[intent];
      setY(change.x + getX());
      setY(change.y + getY());
    })
    .then(function(done) {
      return getField(null, getX(), getY());
    })
    .then(function(movedInto) {
      var returner = [];
      returner.push(setDirection(movedInto.direction));
      returner.push(setOrigin(movedInto.origin));
      returner.push(setCurrentTile(movedInto.tileType));
      return returner;
    })
    .then(function(updated) {
      var returner;
      if (updated[0] == 0 && updated[1] == 1 && updated[2]) {
        returner = true;
      } else {
        returner = false;
      }
      return returner;
    })
    .catch(function(err) {
      console.log('Failed to move to existing tile');
      console.log(err);
    })
  },

  // I || L || T || X

  changePlacer: function(points) {
    console.log('Change placement tile');
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

  changeMode: function() {
    setMode();
    return 'done';
  },

  initiateDelete: function() {
    console.log('Start delete');

    return 'done';
  },

  initiatePlace: function() {
    console.log('Attempt to place');

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

function setForceUpdate(force) {
  forceUpdate = force != focusInput ? force : focusInput;
  return 0;
}

function getForceUpdate() {
  return forceUpdate;
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

function getField(tile, x, y) {
  var returner;
  if (tile) {
    returner = fieldMatrix[tile.x][tile.y];
  } else if (x && y) {
    returner = fieldMatrix[x][y];
  } else {
    returner = fieldMatrix;
  }
  return returner;
}

function getAppState() {
  return {
    field: {
      pos: { xpos: xpos, ypos: ypos },
      gridField: fieldMatrix,
    },
    info: {
      pw: password,
      err: error,
      mode: placeOrMove,
    },
    keyField: inputValue,
    focusOn: focusInput,
    forceUpdate: forceUpdate,
  };
}

export default StateManager;
