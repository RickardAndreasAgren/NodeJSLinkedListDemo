

const ReactConstants = {

  gameSize: 19,

  directions: {
    U: {i: 1, a: 'Y', x: 0, y: -1},
    D: {i: -1, a: 'Y', x: 0, y: 1},
    R: {i: 1, a: 'X', x: 1, y: 0},
    L: {i: -1, a: 'X', x: -1, y: 0},
  },

  getSize: function() {
    return this.gameSize;
  },

  getDirections: function(intent) {
    let returner = null;
    if (intent) {
      returner = this.directions[intent];
    } else {
      returner = this.directions;
    }
    return returner;
  },


}

export default ReactConstants
