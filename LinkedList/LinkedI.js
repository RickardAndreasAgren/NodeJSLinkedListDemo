
const LinkedObject = require('./LinkedObject');

class LinkedI extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);

    this.move = this.move.bind(this);
  }

  move(direction) {
    return this.nextObj;
  }

  set next(next) {
    if (next.obj) {
      this.nextObj = next.obj;
    } else {
      this.nextObj = next;
    }
    return 0;
  }

};

module.exports = LinkedI;
