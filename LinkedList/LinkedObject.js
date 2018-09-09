
class LinkedObject {

  constructor(prevObj, val, direction, entrance) {
    if (prevObj) {
      this.prevObj = prevObj;
    } else {
      this.prevObj = 'start';
    }

    this.direction = direction;
    this.entrance = entrance;
    this.val = val;
    this.nextObj = null;

    this.pop = this.pop.bind(this);
    this.popMe = this.popMe.bind(this);
    this.popStart = this.popStart.bind(this);
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

  get next() {
    return this.nextObj;
  }

  get prev() {
    return this.prevObj;
  }

  get value() {
    return this.val;
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
      if (!newObjectTarget.getVal()) {
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
      newObjectTarget;
    });
  }

  popMe() {
    if (this.nextObj) {
      this.getPrev().setNext(this.nextObj);
      this.getNext().setPrev(this.prevObj);
    } else {
      this.getPrev().setNext(false);
    }

    return this.getVal();
  }

  popStart() {
    this.getNext().setPrev('start');
    return this.getVal();
  }
};

module.exports = LinkedObject;
