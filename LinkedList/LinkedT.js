
const LinkedObject = require('./LinkedObject');
const TileMath = require('../React/TileMath');

class LinkedT extends LinkedObject {
  constructor(prevObj, val, direction, entrance) {
    super(prevObj, val, direction, entrance);

    this.nextObj = [null,null];

    let d = TileMath.getNumber(direction);
    let e = TileMath.getNumber(entrance);
    if (d == e) {
      let r = TileMath.getDirection(TileMath.minus(e,1));
      let l = TileMath.getDirection(TileMath.plus(e,1));
      this.nextDir = [r,l];
    } else if (d == TileMath.plus(e,1)) {
      let a = TileMath.getDirection(TileMath.minus(e,2));
      let r = TileMath.getDirection(TileMath.minus(e,1));
      this.nextDir = [a,r];
    } else if (d == TileMath.minus(e,1)) {
      let l = TileMath.getDirection(TileMath.plus(e,1));
      let a = TileMath.getDirection(TileMath.plus(e,2));
      this.nextDir = [l,a]
    }

    this.getNext = this.getNext.bind(this);
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

};

module.exports = LinkedT;
