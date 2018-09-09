
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

  removeLink() {

  }

  nextCall(func) {
    this.nextCall = func;
  }

  executeNextCall() {

  }

};

module.exports = LinkedList;
