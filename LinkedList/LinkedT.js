
const LinkedObject = require('./LinkedObject');

class LinkedT extends LinkedObject {
  constructor(prevObj, val, direction) {
    super(prevObj, val);
    this.direction = direction;
  }

};

module.exports = LinkedT;
