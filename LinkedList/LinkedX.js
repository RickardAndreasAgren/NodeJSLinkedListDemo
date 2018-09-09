
const LinkedObject = require('./LinkedObject');

class LinkedX extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);

    this.nextObj = [];
  }

  // Count links clockwise

  set next(next) {
    if (next.obj) {
      this.nextObj[exit] = next.obj;
    } else {
      this.nextObj = next;
    }
    return 0;
  }
};

module.exports = LinkedX;
