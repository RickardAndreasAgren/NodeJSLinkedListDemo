
const LinkedObject = require('./LinkedObject');
const TileMath = require('./Util/TileMath');

class LinkedL extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);

    let d = TileMath.getNumber(direction);
    let e = TileMath.getNumber(entrance);
    if (d == 1 && e == 4) {
      this.val = 'L';
    } else if (e < d) {
      this.val = 'L';
    } else {
      this.val = 'R';
    }

    this.move = this.move.bind(this);
    this.setNext = this.setNext.bind(this);
    this.printMe = this.printMe.bind(this);


  }

  move(direction) {
    var returner = null;
    if (direction == this.direction) {
      returner = this.nextObj;
    } else {
      returner = this.prevObj;
    }
    return returner;
  }

  setNext(next) {
    if (next.obj) {
      this.nextObj = next.obj;
    } else {
      this.nextObj = next;
    }
    return 0;
  }

};

module.exports = LinkedL;
