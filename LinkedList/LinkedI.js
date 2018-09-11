
const LinkedObject = require('./LinkedObject');

class LinkedI extends LinkedObject {
  constructor(prev, val, direction, entrance) {
    super(prev, val, direction, entrance);
    console.log('Super was called with');
    console.log(prev);

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
    console.log('I setting next');
    console.log(next);
    if (next.obj) {
      this.nextObj = next.obj;
    } else {
      this.nextObj = next;
    }
    return 0;
  }

};

module.exports = LinkedI;
