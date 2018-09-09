
const LinkedObject = require('./LinkedObject');

class LinkedL extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);
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

module.exports = LinkedL;
