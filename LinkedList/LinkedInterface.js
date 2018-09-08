
const LinkedList = require('./LinkedList');

const LinkedInterface = {


  directions: ['U','R','D','L'],
  types: ['I','L','T','X'],

  /*
    @param:

    @returns true || False
  */

  init: function() {
    this.listState = new LinkedList();
    return true;
  },

  /*
    @param: ('B' || 'U' || 'R' || 'D' || 'L') direction

    B means back
    @returns {action: 'Success'} || {err: err, action: 'Failed'}
  */

  move: function(direction) {
    return this.listState.traverseLink(direction);
  },

  /*
    @param: ('U' || 'R' || 'D' || 'L') direction,
      ('I' || 'L' || 'T' || 'X') type,
      ('U' || 'R' || 'D' || 'L') entrance

    @returns {action: 'Success'} || {err: err, action: 'Failed'}
  */

  create: function(direction, type, entrance) {
    return this.listState.addLink(direction);
  },

  /*
    @param:

    @returns {action: 'Success', move: U || R || D || L }
    || {err: err, action: 'Failed'}
  */

  delete: function() {
    return this.listState.removeLink();
  },

  /*
    @param:

    @returns {action: 'Success', move: U || R || D || L }
    || {err: err, action: 'Failed'}
  */

  continue: function() {
    return this.listState.executeNextCall();
  },
};

module.exports = LinkedInterface;
