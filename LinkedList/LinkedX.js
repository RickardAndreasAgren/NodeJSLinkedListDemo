
const LinkedObject = require('./LinkedObject');

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

  deleteMe(mark) {
    if (mark && !this.markedForDeletion) {
      this.markedForDeletion = 1;
    }
    returner = null;
    if (this.next) {
      returner = {obj: this.next, move: this.direction};
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
