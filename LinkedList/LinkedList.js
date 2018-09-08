
const LinkedI = require('./LinkedI');
const LinkedL = require('./LinkedL');
const LinkedT = require('./LinkedT');
const LinkedX = require('./LinkedX');

class LinkedList {
  constructor() {
    this.start = new LinkedI('start', 0, 'U');
    this.activeLink = this.start;

    this.changeStart = this.changeStart.bind(this);
    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.setNextCall = this.setNextCall.bind(this);
    this.nextCall = this.nextCall.bind(this);
  }

  changeStart() {

  }

  addLink(direction, type, entrance) {

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
