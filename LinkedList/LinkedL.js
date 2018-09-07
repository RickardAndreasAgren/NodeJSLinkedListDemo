
const LinkedObject = require('./LinkedObject');

class LinkedL extends LinkedObject {
  constructor(prevObj, val, direction) {
    super(prevObj, val);
    this.direction = direction;
  }

};

module.exports = LinkedL;
