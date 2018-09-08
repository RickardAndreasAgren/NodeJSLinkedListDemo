
class LinkedObject {

  constructor(prevObj, val, direction) {
    if (prevObj) {
      this.prevObj = prevObj;
    } else {
      this.prevObj = 'start';
    }

    this.direction = direction;
    this.val = val;
    this.nextObj = null;
  }

  setNext(next) {
    if (next) {
      this.nextObj = next;
    } else {
      this.nextObj = null;
    }
  }

  setprev(prev) {
    this.prevObj = prev;
  }

  setValue(val) {
    this.val = val;
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
