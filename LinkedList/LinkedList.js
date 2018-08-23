
const LinkedObject = require('./LinkedObject');

class LinkedList extends LinkedObject {
  constructor(prevObj, val, direction) {
    super(prevObj, val);
    this.direction = direction;
  }

};

module.exports = LinkedList;
