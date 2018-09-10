
const LinkedObject = require('./LinkedObject');
const TileMath = require('./Util/TileMath');

class LinkedX extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);

    this.nextObj = [null,null,null];

    let e = TileMath.getNumber(entrance);
    let d = TileMath.getNumber(direction);
    var alldir = [direction, TileMath.getDirection(TileMath.plus(d,1)),
    TileMath.getDirection(TileMath.plus(d,2)),
    TileMath.getDirection(TileMath.plus(d,3)),];
    alldir.splice(e - 1, 1);
    this.nextDir = alldir;
  }

  // Count links clockwise

  move(direction) {
    for (var dir in this.nextDir) {
      if (this.nextDir[dir] == direction) {
        return this.nextObj[dir] ? this.nextObj[dir] : false;
      }
    }
  }

  set next(next) {
    if (next.obj) {
      if (typeof next.exit == string) {
        for (var i = 0; i < 3; i++) {
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
    if (this.deleted < 3) {
      for (d in this.nextObj) {
        this.deleted = +1;
        if (this.nextObj[d]) {
          returner = d;
          break;
        }
      }
    } else if (this.deleted == 3) {
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
      if (this.deleted == 2) {
        this.markedForDeletion = 2;
      }
    } else {
      returner = {
        delete: true,
        deleteDirection: TileMath.getDirection(
          TileMath.plus(TileMath.getNumber(this.entrance),2)),
        postDeleteMove: this.entrance,
      };
    }
    return returner;
  }
};

module.exports = LinkedX;
