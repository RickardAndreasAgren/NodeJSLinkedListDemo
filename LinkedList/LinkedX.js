
const LinkedObject = require('./LinkedObject');

class LinkedX extends LinkedObject {
  constructor(prevObj, val, direction) {
    super(prevObj, val);
    this.direction = direction;
  }

};

module.exports = LinkedX;
