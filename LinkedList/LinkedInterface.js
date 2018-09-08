
const LinkedList = require('./LinkedList');

const LinkedInterface = {

  init: function() {
    this.listState = new LinkedList();
  },

  /*
    @param: ('B' || 'U' || 'R' || 'D' || 'L') direction

    B means back
    returns True || False
  */

  move: function(direction) {

  },

  /*
    @param: ('U' || 'R' || 'D' || 'L') direction,
      ('I' || 'L' || 'T' || 'X') type,
      ('U' || 'R' || 'D' || 'L') entrance

    returns True || False
  */

  create: function(direction, type, entrance) {

  },

  /*
    @param:

    returns True || False
  */

  delete: function() {

  },

  /*
    @param:

    returns True || False
  */

  continue: function() {

  },
};

module.exports = LinkedInterface;
