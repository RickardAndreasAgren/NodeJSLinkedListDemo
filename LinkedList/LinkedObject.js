
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

    this.setNext = this.setNext.bind(this);
    this.setPrev = this.setPrev.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getNext = this.getNext.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.getVal = this.getVal.bind(this);
    this.pop = this.pop.bind(this);
    this.popMe = this.popMe.bind(this);
    this.popStart = this.popStart.bind(this);
  }

  setNext(next) {
    if (next) {
      this.nextObj = next;
    } else {
      this.nextObj = null;
    }
    return 0;
  }

  setprev(prev) {
    this.prevObj = prev;
    return 0;
  }

  setValue(val) {
    this.val = val;
    return 0;
  }

  getNext() {
    return this.nextObj;
  }

  getPrev() {
    return this.prevObj;
  }

  getVal() {
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
