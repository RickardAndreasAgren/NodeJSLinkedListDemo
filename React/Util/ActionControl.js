
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
  move: function(intention, tile, fieldMatrix) {
    console.log('Try Moving');

    return new Promise((resolve,reject) => {
      resolve(this.lookupIntent(intention, tile, fieldMatrix));
    })
  },

  place: function(intention, tile) {
    return 0;
  },

  lookupIntent: function(intent, currentTile, fieldMatrix) {
    var returner = null;
    return new Promise((resolve,reject) => {
      var destinationInformation = null;
      if (this.lookupExit(intent, currentTile)) {
        destinationInformation = this.lookupDestination(intent,
          currentTile, fieldMatrix
        );
        if (!destinationInformation) {
          reject(false);
        } else {
          resolve(destinationInformation);
        }
      } else {
        reject(false);
      }
    })
  },

  lookupExit: function(intent, currentTile) {
    var dbt = 'check' + currentTile.type;
    var returner = intent == currentTile.direction ? true :
      (DirectionByTile[dbt])(currentTile, intent) ? true : false;
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
      if (tile.tileType == '0') {
        returner = intent;
      } else {
        var entry = TileMath.getDirection(TileMath.plus(intent, 2));
        var dbt = 'check' + currentTile.type;
        if (DirectionByTile[dbt](currentTile, intent)) {
          returner = tile;
        } else {
          returner = false;
        }
      }
    }
    return returner;
  },
}

export default ActionControl;
