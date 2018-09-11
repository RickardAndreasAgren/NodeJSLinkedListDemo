
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
  placed: false,
};

var password = '';
var error = '';
var placeOrMove = 'move'; // 'move' || 'place';

var focusInput = false;
var inputValue = '0';
var forceUpdate = false;
var drawField = false;

var xpos = 9;
var ypos = 18;
var currentTile = 'I'; // I || L || T || X || e
var direction = 'U'; // U || D || L || R (absolute)
var origin = 'D'; // U || D || L || R (absolute)
var placed = true;
var lock = false;
var fieldMatrix = [];




const StateManager = {

  getState: function() {
    return getAppState();
  },

  setPassword: function(val) {
    setPassword(val);
  },

  init: function(fireUpdate) {
    return new Promise((resolve,reject) => {
      console.log('Initializing server state');
      resolve(ClientAPIHelper.init({password: getPassword()}));
    })
    .then(function(serverInit) {
      console.log(serverInit);
      var returner = null;
      if (serverInit) {
        for (var i = 0; i < 19; i++) {
          var newArray = [];
          for (var j = 0; j < 19; j++) {
            newArray.push(JSON.parse(JSON.stringify(deadTile)));
          };
          fieldMatrix.push(newArray);
        }
        returner = true;
      } else {
        returner = false;
      }
      return returner;
    })
    .then(() => {
      fieldMatrix[9][18] = {
        origin: 'D',
        direction: 'U',
        tileType: 'I',
        placed: true,
      };
      setDrawField(true)
      console.log('Field init complete');
      console.log(fieldMatrix);
      setForceUpdate(true);
      fireUpdate();
      return true;
    })
    .catch(function(err) {
      console.log(err)
      return false;
    })

  },

  setFocus: function(tof) {
    return setFocusInput(tof);
  },

  toggleForceUpdate: function(fu) {
    return setForceUpdate(fu);
  },

  attemptAction: function(e, callback) {
    var _this = this;
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
          console.log(getCurrentTile());
          if (getCurrentTile() == 'e' && actionIntention in directions &&
            getMode() == 'move') {
            if (actionIntention == getOrigin()) {
              returner = 'E' + actionIntention;
            } else {
              returner = false;
            }
          } else if (actionIntention in directions) {
            var tile = getFullTile();
            returner = ActionControl[getMode()](
              actionIntention,
              tile,
              getField(),
            );
          } else {
            console.log('Checking non-arrow actions');
            // . e b s
            returner = actionIntention == 'e' ? _this.initiatePlace() :
            actionIntention == 's' ? _this.changePlacer() :
            actionIntention == 'b' ? _this.initiateDelete() :
            actionIntention == 't' ? _this.changeMode() : false;
          }
          console.log('Action results');
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
          console.log('Taking Action: ');
          console.log(action);
          if (action.change && action.change == 'done') {
            returner = true;
          } else if (action[0] == 'P' && action[1] in moveActions) {
            console.log('Changing tile direction');

            returner = this.changePlaceDirection(action);
          } else if (action[0] != 'E' && action[0] in moveActions) {
            console.log('Move to empty tile');
            // Update move to empty slot
            returner = this.changeSelectEmpty(action);
          } else if (action[1] in moveActions) {
            console.log('Move to existing tile');
            // Update current info to confirm move
            returner = this.changeSelectExist(action[1]);
          } else {
            returner = true;
          }
          console.log(getX());
          console.log(getY());
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
    var _this = this;
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
      let returner = setCurrentTile('e');
      return returner;
    })
    .then(function(beO) {
      var returner = null;
      console.log(beO);
      if (beO == 0) {
        returner = _this.changePlacer(false);
        console.log('Changing placer to: ');
        console.log(returner);
      } else {
        returner = false;
      }
      return returner;
    })
    .then(function(done) {
      console.log('Set these');
      console.log(done);
      if (done) {
        setCurrentTile(done.type);
        setDirection(done.direction);
        setPlaced(false);
        var placingTile = {
          direction: getDirection(),
          tileType: getCurrentTile(),
          origin: getOrigin(),
          placed: false,
        };
        setField(getX(),getY(),placingTile);
        setForceUpdate(true);
      }
      return done;
    })
    .catch(function(err) {
      console.log('Failed to move to empty tile');
      console.log(err);
    })
  },

  changeSelectExist: function(intent) {
    console.log('Moving to active tile');
    console.log(intent);
    return new Promise((resolve,reject) => {
      resolve(setMode('move'));
    })
    .then(function() {
      return ClientAPIHelper.move({
        direction: intent,
        password: getPassword(),
      });
    })
    .then(function(moveResult) {
      var returner = null;
      if (moveResult.action == 'Success') {
        returner = true;
        if (!getPlaced()) {
          setField(getX(),getY(),{
            direction: '0',
            origin: '0',
            tileType: 'e',
            placed: false,
          });
        }
        var change = directions[intent];
        setX(change.x + getX());
        setY(change.y + getY());
        console.log(getX());
        console.log(getY());
      } else if (moveResult.err) {
        throw new Error(moveResult.err);
      } else {
        throw new Error('Creation failure');
      }
      return returner;
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
      if (updated[0] == 0 && updated[1] == 0 && updated[2] == 0) {
        setPlaced(true);
        returner = true;
      } else {
        throw new Error({sd: updated[0], so: updated[1], sc: updated[2]});
      }
      return returner;
    })
    .catch(function(err) {
      console.log('Failed to move to existing tile');
      console.log(err);
      return false;
    })
  },

  // I || L || T || X

  changePlacer: function(intent) {
    console.log('Change placement tile');
    var hasIntent = intent ? intent : false;
    return ActionControl['place'](
      hasIntent,
      getFullTile(),
      getField(),
    );
  },

  changePlaceDirection: function(intent) {
    var _this = this;
    return new Promise((resolve,reject) => {
      if (!intent) {
        reject('')
      } else {
        resolve(_this.changePlacer(intent));
      }
    })
    .then(function(tileInfo) {
      var returner = null;
      if (tileInfo) {
        // Set all new tile info
        returner = true;
      } else {
        returner = false;
      }
      return returner;
    })
    .catch(function(err) {
      console.log('Failed to prep placing tile when changing mode');
      console.log(err);
      return false;
    })
  },

  changeMode: function() {
    var _this = this;
    return new Promise((resolve,reject) => {
      console.log('Change mode');
      resolve(setMode(false));
    })
    .then(function(modeWasSet) {
      var returner = null;
      console.log('Mode set');
      console.log(modeWasSet);
      if (modeWasSet == 0) {
        if (getMode() == 'place') {
          console.log('Changing mode to place');
          if (!getPlaced) {
            _this.changePlacer(false);
          } else if (getCurrentTile() != 'e') {
            setMode('move');
            returner = 1;
          } else {
            var returner = new Promise((resolve,reject) => {
              var done = _this.changePlacer(TileMath.getDirection(
                TileMath.plus(
                  TileMath.getNumber(getOrigin(),2)
                )
              ))
              resolve(done);
            }).then(function(done) {
              console.log('Setting placer')
              if (done) {
                setCurrentTile(done.type);
                setDirection(done.direction);
                setPlaced(false);
                var placingTile = {
                  direction: getDirection(),
                  tileType: getCurrentTile(),
                  origin: getOrigin(),
                  placed: false,
                };
                setField(getX(),getY(),placingTile);
                setForceUpdate(true);
              }
              return done;
            });
          }
        } else if (getMode() == 'move') {
          console.log('Changing mode to move');
          if (!getPlaced()) {
            setField(getX(),getY(),deadTile);
            setCurrentTile('e');
            setDirection('U');
          }
          returner = 1;
        }
      } else {
        console.log('Didnt change mode. So why is this called?');
        returner = false;
      }
      return returner;
    })
    .then(function(proceed) {
      return new Promise((resolve,reject) => {
        if (!proceed) {
          reject('Setting placer failed');
        } else if (proceed == 1) {
          resolve({change: 'done'});
        } else {
          // Set all new tile info
          resolve({change: 'done'});
        }
      })
    })
    .catch(function(err) {
      console.log('Failed to prep placing tile when changing mode');
      console.log(err);
      return false;
    })
  },

  initiateDelete: function() {
    console.log('Start delete');

    return 'done';
  },

  initiatePlace: function() {
    var _this = this;
    console.log('Attempt to place');
    return new Promise((resolve,reject) => {
      var createCall = ClientAPIHelper.create({
        direction: getDirection(),
        type: getCurrentTile(),
        entrance: getOrigin(),
        password: getPassword(),
      });
      resolve(createCall);
    })
    .then(function(createResult) {
      console.log('API call yielded: ');
      console.log(createResult);
      var returner = null;
      if (createResult.action == 'Success') {
        setPlaced(true);
        setField(getX(),getY(),{
          origin: getOrigin(),
          direction: getDirection(),
          tileType: getCurrentTile(),
          placed: true,
        });
        setForceUpdate(true);
        returner = true;
      } else if (createResult.err) {
        throw new Error(createResult.err);
      } else {
        throw new Error('Creation failure');
      }
      return returner;
    })
    .then(function(createOk) {
      return _this.changeMode();
    })
    .then(function(modeChanged) {
      var returner = null;
      if (!modeChanged.err) {
        returner = true;
      } else {
        throw new Error(modeChanged.err);
      }
      return returner;
    });
  },
};

function getFullTile(xy) {
  var returner = null;
  if (xy) {
    var xyObj = getField(false,xy.x,xy.y);
    returner = Object.assign({x: xy.x, y: xy.y}, xyObj);
  } else {
    returner = {
      x: getX(),
      y: getY(),
      origin: getOrigin(),
      direction: getDirection(),
      type: getCurrentTile(),
      placed: getPlaced(),
    }
  }
  return returner;
}

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

function setPlaced(tof) {
  if (tof) {
    placed = true;
  } else {
    placed = false;
  }
  return 0;
}

function getPlaced() {
  return placed;
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

function setDrawField(tof) {
  drawField = tof;
}

function getDrawField() {
  return drawfield;
}

function setField(x,y,tileUpdate) {
  fieldMatrix[x][y] = tileUpdate;
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
    drawField: drawField,
  };
}

export default StateManager;
