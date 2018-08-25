

/* I
  action: actionIntention,
  currentPosition:
   {
   x: xpos,
   y: ypos,
   origin: dir,
   direction: dir,
 }
  field: fieldMatrix,
*/
const directions = {
  U: {i: 1, a: Y},
  D: {i: -1, a: Y},
  R: {i: 1, a: X},
  L: {i: -1, a: X},
};

const ActionControl = {
  move: function(intention, currentPosition, currentTile, fieldMatrix) {
    var _this = this;
    var cp = currentPosition;
    var goTo = directions[intention];

    return new Promise((resolve,reject) => {
      resolve(_this.lookupIntent(x, y, direction));
    })
    .then((possibleIntent) => {

    })
  },

  place: function() {
    var align = directions[direction];
  },

  lookupIntent: function(intent, currentTile, x, y, direction) {
    var returner = null;
    return new Promise((resolve,reject) => {
      if (this.lookupExit(intent, currentTile, direction) &&
      this.lookupDestination(x,y,entrypoint)) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  },

  lookupExit: function(intent, currentTile, direction) {

  },

  lookupDestination: function(x, y, entrypoint) {
    // Invert intent to check entry
  },
}

export default ActionControl;
