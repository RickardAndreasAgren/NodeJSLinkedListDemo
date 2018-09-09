
const LinkedI = require('./LinkedI');
const LinkedL = require('./LinkedL');
const LinkedT = require('./LinkedT');
const LinkedX = require('./LinkedX');

const links = {
  I: LinkedI,
  L: LinkedL,
  T: LinkedT,
  X: LinkedX,
};

class LinkedList {
  constructor() {
    this.start = new LinkedI('start', 0, 'U');
    this.activeLink = this.start;

    this.changeStart = this.changeStart.bind(this);
    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.executeNextCall = this.executeNextCall.bind(this);
    this.nextCall = () => {console.log('No next call set')};
  }

  changeStart() {
    return false;
  }

  addLink(direction, type, entrance, exit) {
    var newLink = new links[type](this, 0, direction, entrance)
    this.activeLink.next({obj: newLink, exit: exit});
    this.activeLink = this.activeLink.next();
  }

  traverseLink(direction) {
    this.activeLink = this.activeLink.move(direction);
  }

  removeLink(startDelete) {
    var returner = null;
    if (!this.activeLink.markedForDeletion) {
      this.deleting = false;
    } else if (startDelete) {
      this.deleting = startDelete;
    }

    if (this.deleting) {

      var next = this.activeLink.deleteMe();

      if (next.move && next.move in ['U','R','D','L']) {
        this.activeLink = this.activeLink.move(next.move);
        returner = {move: next.obj.move, delete: 0};
      } else if (next.delete) {
        var killDirection = next.deleteDirection;
        this.activeLink = this.activeLink.prev;
        this.activeLink.next = {obj: null};

        returner = {move: next.postDeleteMove, delete: 1};
      }
    } else {
      returner = 1;
    }
    return returner;
  }
};

module.exports = LinkedList;
