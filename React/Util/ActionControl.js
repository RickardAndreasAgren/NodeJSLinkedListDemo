
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
const directions = {
  U: {i: 1, a: 'Y'},
  D: {i: -1, a: 'Y'},
  R: {i: 1, a: 'X'},
  L: {i: -1, a: 'X'},
};

const ActionControl = {
  move: function(intention, tile, fieldMatrix) {
    var goTo = directions[intention];

    return new Promise((resolve,reject) => {
      resolve(this.lookupIntent(intention, tile, fieldMatrix));
    })
    .then((possibleIntent) => {

    })
  },

  place: function() {
    var align = directions[direction];
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
    .then((destinationInformation) => [

    ])
  },

  lookupExit: function(intent, currentTile) {
    var dbt = 'check' + currentTile;
    return intent == origin ? true :
      DirectionByTile[dbt](currentTile, intent) ? true : false;
  },

  lookupDestination: function(intent, currentTile, fieldMatrix) {
    var returner = null;
    var tile = fieldMatrix[currentTile.x][currentTile.y];
    if (tile == 0) {
      returner = 'new';
    } else {
      var entry = TileMath.numberToDirection[TileMath.plus(intent, 2)]
      var dbt = 'check' + tile;
      if (DirectionbyTile[dbt](currentTile, intent)) {
        returner = tile;
      } else {
        returner = false;
      }
    }
    return returner;
  },
}

export default ActionControl;
