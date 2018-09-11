
const LinkedObject = require('./LinkedObject');
const TileMath = require('./Util/TileMath');

class LinkedT extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);

    this.nextObj = [null,null];

    let d = TileMath.getNumber(direction);
    let e = TileMath.getNumber(entrance);
    if (d == e) {
      var r = TileMath.getDirection(TileMath.minus(e,1));
      var l = TileMath.getDirection(TileMath.plus(e,1));
      this.nextDir = [r,l];
    } else if (d == TileMath.plus(e,1)) {
      var a = TileMath.getDirection(TileMath.minus(e,2));
      var r = TileMath.getDirection(TileMath.minus(e,1));
      this.nextDir = [a,r];
    } else if (d == TileMath.minus(e,1)) {
      var l = TileMath.getDirection(TileMath.plus(e,1));
      var a = TileMath.getDirection(TileMath.plus(e,2));
      this.nextDir = [l,a]
    }

    this.deleted = 0;
  }

  // Count links clockwise

  move(direction) {
    for (var dir in this.nextDir) {
      if (this.nextDir[dir] == direction) {
        return this.nextObj[dir] ? this.nextObj[dir] : false;
      }
    }
  }

  getNext(nextEntrance) {
    return nextObj[this.nextDir.indexOf(TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(nextEntrance),2)))];
  }

  setNext(next) {
    if (next.obj) {
      if (typeof next.exit == string) {
        for (var i = 0; i < 2; i++) {
          if (this.nextDir[i] == next.exit) {
            this.nextObj[i] = next.exit;
          }
        }
      } else {
        this.nextObj[next.exit] = next.obj;
      }
    } else {
      this.nextObj = next;
    }
    return 0;
  }

  nextDelete() {
    var returner = null;
    if (this.deleted < 2) {
      for (d in this.nextObj) {
        this.deleted = +1;
        if (this.nextObj[d]) {
          returner = d;
          break;
        }
      }
    } else if (this.deleted == 2) {
      returner = false;
    }
    return returner
  }

  deleteMe(mark) {
    if (mark && !this.markedForDeletion) {
      this.markedForDeletion = 1;
    }
    returner = null;
    var toDelete = this.nextDelete();
    if (toDelete) {
      returner = {obj: nextObj[toDelete], move: this.nextDir[toDelete]};
      if (this.deleted == 1) {
        this.markedForDeletion = 2;
      }
    } else {
      returner = {
        delete: 1,
        deleteDirection: TileMath.getDirection(
          TileMath.plus(TileMath.getNumber(this.entrance),2)),
        postDeleteMove: this.entrance,
        tx: true,
      };
    }
    return returner;
  }

};

module.exports = LinkedT;
