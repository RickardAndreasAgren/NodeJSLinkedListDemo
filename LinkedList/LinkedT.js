
const LinkedObject = require('./LinkedObject');

class LinkedT extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);
  }

};

module.exports = LinkedT;
