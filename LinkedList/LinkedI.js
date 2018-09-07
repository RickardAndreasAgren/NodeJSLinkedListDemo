
const LinkedObject = require('./LinkedObject');

class LinkedI extends LinkedObject {
  constructor(prevObj, val, direction) {
    super(prevObj, val);
    this.direction = direction;
  }

};

module.exports = LinkedI;
