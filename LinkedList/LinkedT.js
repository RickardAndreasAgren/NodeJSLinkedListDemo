
const LinkedObject = require('./LinkedObject');

class LinkedT extends LinkedObject {
  constructor(prevObj, val, direction) {
    super(prevObj, val, direction);
  }

};

module.exports = LinkedT;
