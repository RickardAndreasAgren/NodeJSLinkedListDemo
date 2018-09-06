
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
  move: function(intent, currentTile, fieldMatrix) {
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
    var returner = intent == currentTile.direction ? true :
      (DirectionByTile[dbt])(currentTile, intent) ? true : false;
    console.log('Exit is ');
    console.log(returner);
    return returner;
  },

  lookupDestination: function(intent, currentTile, fieldMatrix) {
    var returner = null;
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
        var entry = TileMath.getDirection(TileMath.plus(intent, 2));
        var dbt = 'check' + currentTile.type;
        if (DirectionByTile[dbt](tile, entry)) {
          returner = tile;
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
    // Empty intent = try to change tile type
    var _this = this;
    var checkTile = currentTile.type == 'e' ? currentTile :
      {
        x: currentTile.x,
        y: currentTile.y,
        origin: currentTile.origin,
        direction: intention,
        tileType: 'I',
      };
    var loopLimit = currentTile.type;
    var directionCounter = 0;
    var changedTile = false;


    const promiseWhile = (data, condition, action) => {
      var whilst = (data) => {
        console.log(data);
        return condition(data) ?
        action(data).then(whilst) :
        Promise.resolve(data);
      }
      return whilst(data);
    };

    return new Promise((resolve,reject) => {

      if (!intention) {
        var findingNewTilePossibility = true;

        const acceptableTile = (dataBlob) => {
          return new Promise((resolve, reject) => {
            // Do all the things
            // count directions
            if (_this.lookupPlacingExits(null, null)) {

            }
            // If tile ok, set findingNewTilePossibility to false
            // if tile type is loop limit and changedTile is false and all directions tested,
            //  change tile type and set changedTile to true
            // else if tile type is loop limit and changedTile is false, try next option
            // else if tile type is loop limit, set findingNewTilePossibility to false
            //    and reject in then
            // else if all tile directions attempted, change tile type
            // else if tile bad, try next tile
            //
            // "all directions tested, direction counter == 3", dont forget to reset
            resolve(findingNewTilePossibility);
          });
        }

        promiseWhile(checkTile, tc => tc == true, acceptableTile)
        .then(() => {
          // Return working tile
        })
      } else {
        if (_this.lookupExit(intention, checkTile, 'place')) {
          if (_this.lookupPlacingConnections(intent, checkTile, fieldMatrix)) {
            // Return 'P'+directionLetter
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

  cycleType: function(type) {
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
}

export default ActionControl;
