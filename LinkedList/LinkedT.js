
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
      var a = TileMath.getDirection(TileMath.plus(e,2));
      var l = TileMath.getDirection(TileMath.plus(e,1));
      this.nextDir = [l,a];
    } else if (d == TileMath.minus(e,1)) {
      var r = TileMath.getDirection(TileMath.minus(e,1));
      var a = TileMath.getDirection(TileMath.minus(e,2));
      this.nextDir = [a,r]
    }

    this.deleted = 0;
    this.move = this.move.bind(this);
    this.setNext = this.setNext.bind(this);
    this.printMe = this.printMe.bind(this);


  }

  // Count links clockwise

  move(direction) {
    console.log('T moving.');
    var returner = null;
    if (direction == this.entrance) {
      returner = this.prevObj;
    } else {
      returner = this.nextObj[this.nextDir.indexOf(direction)] ?
      this.nextObj[this.nextDir.indexOf(direction)] : false;
    }
    console.log(direction);
    console.log(this.nextDir.indexOf(direction))
    console.log(this.nextDir);
    console.log(this.nextObj);
    console.log(returner);
    return returner;
  }

  getNext(nextEntrance) {
    return nextObj[this.nextDir.indexOf(TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(nextEntrance),2)))];
  }

  setNext(next) {
    console.log('Setting next in T');
    console.log(this.nextDir);
    console.log(next);
    var exit = TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(next.exit),2));
    console.log(this.nextDir.indexOf(exit));
    if (next.obj) {
      this.nextObj[this.nextDir.indexOf(exit)] = next.obj;
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
