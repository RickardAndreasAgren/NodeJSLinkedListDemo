
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
    var returner = null;
    var moveResult = this.listState.traverseLink(direction)
    if (moveResult == 0) {
      returner = {action: 'Success'};
    } else {
      returner = {action: 'Failed', err: moveResult}
    }
    return returner;
  },

  /*
    @param: ('U' || 'R' || 'D' || 'L') direction,
      ('I' || 'L' || 'T' || 'X') type,
      ('U' || 'R' || 'D' || 'L') entrance

    @returns {action: 'Success'} || {err: err, action: 'Failed'}
  */

  create: function(direction, type, entrance) {
    var returner = null;
    var createResult = this.listState.addLink(direction);
    if (createResult == 0) {
      returner = {action: 'Success'};
    } else {
      returner = {action: 'Failed', err: createResult}
    }
    return returner;
  },

  /*
    @param:

    @returns {action: 'Success', move: U || R || D || L }
    || {err: err, action: 'Failed'}
  */

  delete: function(start) {
    var returner = null;
    var deleteResult = this.listState.removeLink(start);
    if (typeof deleteResult == 'string') {
      returner = {
        action: 'Success',
        move: createResult.move,
        delete: createResult.delete,
      };
    } else if (deleteResult == 1) {
      returner = {action: 'Success', done: true};
    } else {
      returner = {action: 'Failed', err: deleteResult};
    }
    return returner;
  },

  /*
    @param:

    @returns {action: 'Success', move: U || R || D || L || null}
    || {err: err, action: 'Failed'}
  */

  continue: function() {
    return this.delete(false);
  },
};

module.exports = LinkedInterface;
