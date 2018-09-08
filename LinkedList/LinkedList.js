
const LinkedI = require('./LinkedI');
const LinkedL = require('./LinkedL');
const LinkedT = require('./LinkedT');
const LinkedX = require('./LinkedX');

const links = {
  I: LinkedI,
  L: LinkedL,
  T: LinkedT,
  X: Linkedx,
};

class LinkedList {
  constructor() {
    this.start = new LinkedI('start', 0, 'U');
    this.activeLink = this.start;

    this.changeStart = this.changeStart.bind(this);
    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.setNextCall = this.setNextCall.bind(this);
    this.executeNextCall = this.executeNextCall.bind(this);
    this.nextCall = () => {console.log('No next call set')};
  }

  changeStart() {
    return false;
  }

  addLink(direction, type, entrance) {
    this.activeLink.setNext(new links[type], 0, direction, entrance);
  }

  traverseLink(direction) {

  }

  removeLink() {

  }

  setNextCall() {

  }

  nextCall () {

  }

};

module.exports = LinkedList;
