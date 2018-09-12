
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

    this.deleted = 0;
    this.move = this.move.bind(this);
    this.setNext = this.setNext.bind(this);
    this.printMe = this.printMe.bind(this);


  }

  // Count links clockwise

  move(direction) {
    console.log('X moving.');
    var returner = null;
    if (direction == this.entrance) {
      returner = this.prevObj;
    } else {
      returner = this.nextObj[this.nextDir.indexOf(direction)];
    }
    return returner;
  }

  getNext(nextEntrance) {
    return nextObj[this.nextDir.indexOf(TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(nextEntrance),2)))];
  }

  setNext(next) {
    console.log('Setting next in X');
    console.log(this.nextDir);
    console.log(this.nextDir.indexOf(next.exit));
    var exit = TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(next.exit),2));
    if (next.obj) {
      this.nextObj[this.nextDir.indexOf(exit)] = next.obj;
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

module.exports = LinkedX;
