
const LinkedI = require('./LinkedI');
const LinkedL = require('./LinkedL');
const LinkedT = require('./LinkedT');
const LinkedX = require('./LinkedX');

const links = {
  I: (p,v,d,e) => {return new LinkedI(p,v,d,e)},
  L: (p,v,d,e) => {return new LinkedL(p,v,d,e)},
  T: (p,v,d,e) => {return new LinkedT(p,v,d,e)},
  X: (p,v,d,e) => {return new LinkedX(p,v,d,e)},
};

class LinkedList {
  constructor() {
    this.start = new LinkedI('start', 0, 'U');
    this.activeLink = this.start;

    this.changeStart = this.changeStart.bind(this);
    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
  }

  changeStart() {
    return false;
  }

  addLink(direction, type, entrance, exit) {
    console.log(type);
    var newLink = links[type](this.activeLink, 0, direction, entrance)
    this.activeLink.setNext = {obj: newLink, exit: exit};
    this.activeLink = this.activeLink.getNext(nextEntrance);
  }

  traverseLink(direction) {
    this.activeLink = this.activeLink.move(direction);
    return 0;
  }

  removeLink(startDelete) {
    var returner = null;
    if (this.deleting == true && this.activeLink.marked == 0) {
      this.deleting = false;
    } else if (startDelete) {
      this.deleting = startDelete;
    }

    if (this.deleting) {

      var next = this.activeLink.deleteMe();

      if (next.move && next.move in ['U','R','D','L']) {
        this.activeLink = this.activeLink.move(next.move);
        returner = {move: next.obj.move, delete: 0};
      } else if (next.delete == 1) {
        var killDirection = next.deleteDirection;
        this.activeLink = this.activeLink.prev;
        if (next.tx) {
          this.activeLink.nextObj[
            activeLink.nextDir.indexOf(killDirection)] = null;
        } else {
          this.activeLink.next = null;
        }

        returner = {move: next.postDeleteMove, delete: 1};
      }
    } else {
      returner = 1;
    }
    return returner;
  }
};

module.exports = LinkedList;
