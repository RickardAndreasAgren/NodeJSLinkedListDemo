
import ReactConstants from '../ReactConstants';

import TileMath from './TileMath';
import DirectionByTile from './DirectionByTile';

/* I
  action: actionIntention,
  currentPosition:
   {
   x: xpos,
   y: ypos,
   origin: dir,
   direction: dir,
   type: type,
 }
  field: fieldMatrix,
*/

const ActionControl = {
  move: function(intent, currentTile, fieldMatrix, notUsed) {
    console.log('Try Moving');

    return new Promise((resolve,reject) => {
      var destinationInformation = null;
      if (this.lookupExit(intent, currentTile, 'check')) {
        destinationInformation = this.lookupDestination(intent,
          currentTile, fieldMatrix
        );
        console.log('Intent DI ');
        console.log(destinationInformation);
        if (!destinationInformation) {
          reject(false);
        } else {
          console.log(currentTile);
          resolve(destinationInformation);
        }
      } else {
        reject(false);
      }
    })
    .catch(function(err) {
      console.log('Move not allowed');
      return false;
    })
  },

  lookupExit: function(intent, currentTile, lookupType) {
    var dbt = lookupType + currentTile.type;
    console.log('Looking up exit. ', dbt);
    var returner = intent == currentTile.direction ? true :
      (DirectionByTile[dbt])(currentTile, intent) ? true : false;
    console.log('Exit is ');
    console.log(returner);
    return returner;
  },

  lookupDestination: function(intent, currentTile, fieldMatrix) {
    var returner = null;
    console.log('Looking up destination');
    let x = currentTile.x + ReactConstants.getDirections(intent).x;
    let y = currentTile.y + ReactConstants.getDirections(intent).y;
    if (x < 0 || x > (ReactConstants.getSize() - 1) || y < 0
      || y > ReactConstants.getSize() - 1) {
      returner = false;
    } else {
      var tile = fieldMatrix[x][y];
      if (tile.tileType == 'e') {
        returner = intent;
      } else {
        var entry = TileMath.getDirection(
          TileMath.plus(
            TileMath.getNumber(intent), 2));
        var dbt = 'check' + currentTile.type;
        if (DirectionByTile[dbt](tile, entry)) {
          returner = 'E' + intent;
        } else {
          returner = false;
        }
      }
    }
    console.log('Destination is ');
    console.log(returner);
    return returner;
  },

  place: function(intention, currentTile, fieldMatrix) {
    // Empty intent = try to change tile type, return P+direction
    // todo DEBUG
    console.log('Placing called with intent: ');
    console.log(intention);
    var _this = this;
    var checkTile = currentTile.type != 'e' ? currentTile :
      {
        x: currentTile.x,
        y: currentTile.y,
        origin: currentTile.origin,
        direction: (intention ? intention : currentTile.direction),
        type: 'I',
      };
    checkTile.type = intention == 'c' ? _this.cycleType('I') : checkTile.type;
    checkTile.direction = intention == 'c' ?
      _this.defaultDirection(checkTile) :
      checkTile.direction;
    var loopLimit = currentTile.type;
    var directionCounter = 0;
    var changedTile = false;
    var findingNewTilePossibility = true;


    const promiseWhile = (data, condition, action) => {
      var whilst = (data) => {
        console.log('whilst ', data);
        return condition(data) ?
        action(data).then(whilst) :
        Promise.resolve(data);
      }
      return whilst(data);
    };

    return new Promise((resolve,reject) => {
      console.log('ACPp: ', intention);
      if (!intention || !(intention in ['U','R','D','L'])) {

        const acceptableTile = (tileTry) => {
          return new Promise((iresolve, ireject) => {
            console.log('ACP: Look up exit');
            console.log(tileTry)
            if (_this.lookupExit(tileTry.direction, tileTry, 'place')) {
              console.log('ACP: Found tile option');
              if (_this.lookupPlacingConnections(tileTry.direction,
                tileTry, fieldMatrix)) {
                console.log('ACP: Found tile direction');
                findingNewTilePossibility = false;
                iresolve(tileTry);
              } else if (tileTry.type == loopLimit && changedTile == false) {
                console.log('ACP: rotate1');
                tileTry.type = _this.cycleType(tileTry.type);
                changedTile = true;
                iresolve(tileTry);
              } else if (tileTry.type == loopLimit) {
                console.log('ACP: rotate2');
                findingNewTilePossibility = false;
                iresolve(false);
              } else {
                console.log('ACP: rotate3');
                tileTry.type = _this.cycleType(tileTry.type);
                iresolve(tileTry);
              }
            } else {
              tileTry.direction = TileMath.getDirection(
                TileMath.plus(TileMath.getNumber(tileTry.direction),1)
              );
              console.log('ACP: rotate4');
              iresolve(tileTry);
            }
          });
        }

        var findPlacingOption = promiseWhile(checkTile,
          () => findingNewTilePossibility == true,
          acceptableTile)
        .then((result) => {
          console.log('ACPresult: ');
          console.log(result);
          var returner;
          if (!result) {
            throw new Error('Cant place a tile here');
          } else {
            returner = result;
          }
          return returner;
        })
        .catch((err) => {
          console.log('Promise loop errored');
          console.log(err);
          return false;
        })

        resolve(findPlacingOption);

      } else {
        console.log('No intent in placing');
        if (_this.lookupExit(intention, checkTile, 'place')) {
          console.log('Placing intent OK');
          if (_this.lookupPlacingConnections(intent, checkTile, fieldMatrix)) {
            console.log('Placing connections OK');
            resolve('P' + checkTile.direction);
          }
        } else {
          reject('Can not resolve placing intent');
        }
      }
    })
    .catch(function(err) {
      console.log('Placing not allowed');
      return false;
    })
  },

  lookupPlacingConnections: function(intent, tile, matrix) {
    // Establish lookup directions, remove origin
    // check adjacent tiles, tile.origin is
    var _this = this;
    return new Promise((resolve,reject) => {
      for (var i = 1; i < 5; i++) {
        var dbt = 'check' + tile.type;
        console.log('LPC: ', dbt);
        if (tile.origin != TileMath.getDirection(i) &&
        DirectionByTile[dbt](tile, TileMath.getDirection(i))) {
          if (!_this.lookupNextConnection(i,tile,matrix)) {
            resolve(false);
          }
        }
      }
      resolve(true);
    })
  },

  lookupNextConnection: function(num, currentTile, matrix) {
    var directions = ReactConstants.directions;
    var xC = currentTile.x + directions[TileMath.getDirection(num)].x;
    var yC = currentTile.y + directions[TileMath.getDirection(num)].y;
    var tileInfo = matrix[xC][yC];
    var testIntent = TileMath.getDirection(TileMath.minus(num,2));
    var tileToTest = {
      x: xC,
      y: yC,
      origin: tileInfo.origin,
      type: tileInfo.tileType,
      direction: tileInfo.direction,
    };
    console.log('Check exit on ');
    console.log(tileToTest);
    return (tileInfo.tileType == 'e' ? true :
      this.lookupExit(testIntent, tileToTest, 'check'));
  },

  cycleType: function(type) {
    console.log('Cycling tile type');
    var returner = type;
    switch (type) {
      case 'I': {
        returner = 'L';
        break;
      }
      case 'L': {
        returner = 'T';
        break;
      }
      case 'T': {
        returner = 'X';
        break;
      }
      case 'X': {
        returner = 'I';
        break;
      }
      default: {
        break;
      }
    }
    return returner;
  },

  defaultDirection: function(origin, tile) {

    return new Promise((resolve,reject) => {
      var a;
      // By type verify direction is allowed from origin
    })
  },
}

export default ActionControl;
