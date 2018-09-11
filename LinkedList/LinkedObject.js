
const TileMath = require('./Util/TileMath');

class LinkedObject {

  constructor(prev, val, direction, entrance) {
    prev ? console.log('PO', prev) : console.log('PO not supplied');
    console.log(val);
    console.log(direction);
    console.log(entrance);
    if (prev) {
      this.prevObj = prev;
    } else {
      this.prevObj = 'start';
    }

    this.direction = direction;
    this.entrance = entrance;
    this.val = val ? val : '1';
    this.nextObj = null;
    this.markedForDeletion = 0;

    /*
    This.deleteMe = this.deleteMe.bind(this);
    this.nextDelete = this.nextDelete.bind(this);
    this.pop = this.pop.bind(this);
    this.popMe = this.popMe.bind(this);
    this.popStart = this.popStart.bind(this); */
  }

  set next(next) {
    this.nextObj = next;
    return 0;
  }

  set prev(prev) {
    this.prevObj = prev;
    return 0;
  }

  set value(val) {
    this.val = val;
    return 0;
  }

  set marked(val) {
    this.markedForDeletion = val;
    return 0;
  }

  get next() {
    return this.nextObj;
  }

  get prev() {
    return this.prevObj;
  }

  get value() {
    return this.val;
  }

  get marked() {
    return this.markedForDeletion;
  }

  nextDelete() {
    return null;
  }

  setNext(next) {
    console.log('LO');
    if (next.obj) {
      this.nextObj = next.obj;
    } else {
      this.nextObj = next;
    }
    return 0;
  }

  getNext(unused) {
    return this.nextObj ? this.nextObj : null;
  }

  deleteMe(mark) {
    if (mark && !this.markedForDeletion) {
      this.markedForDeletion = 1;
    }
    returner = null;
    if (this.next) {
      this.markedForDeletion = 2;
      returner = {obj: this.next, move: this.direction};
    } else {
      returner = {
        delete: 1,
        deleteDirection: TileMath.getDirection(
          TileMath.plus(TileMath.getNumber(this.entrance),2)),
        postDeleteMove: this.entrance,
      };
    }
    return returner;
  }

  pop() {
    return new Promise(function(resolve, reject) {
      var resolved = null;
      if (this.prevObj == 'start') {
        resolve(this.popStart());
      } else {
        resolve(this.popMe());
      }
    })
    .then(function(newObjectTarget) {
      if (!newObjectTarget.value) {
        throw new Error('Value missing');
      } else {
        return newObjectTarget;
      }
    })
    .catch(function(err) {
      console.log('Something got Trumped.');
      throw new Error('Link error');
    })
    .finally(function(newObjectTarget) {
      return newObjectTarget;
    });
  }

  popMe() {
    if (this.nextObj) {
      this.prev().next(this.nextObj);
      this.next().prev(this.prevObj);
    } else {
      this.prev().next(false);
    }

    return this.getVal();
  }

  popStart() {
    this.getNext().setPrev('start');
    return this.getVal();
  }

  printMe() {
    console.log(this.entrance);
    console.log(this.direction);
    console.log(this.value);
    this.prevObj ? console.log('Linked next') : null;
    this.nextObj ? console.log('Linked prev') : null;
  }
};

module.exports = LinkedObject;
