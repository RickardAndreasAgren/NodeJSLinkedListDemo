
const LinkedObject = require('./LinkedObject');

class LinkedI extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);
  }

};

module.exports = LinkedI;
