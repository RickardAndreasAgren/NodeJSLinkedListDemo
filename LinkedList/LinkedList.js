
import LinkedI from './LinkedI';
import LinkedL from './LinkedL';
import LinkedT from './LinkedT';
import LinkedX from './LinkedX';

class LinkedList {
  constructor() {
    this.start = new Linked(null, null);
    this.activeLink = this.start;

    this.changeStart = this.changeStart.bind(this);
    this.addLink = this.addLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.setNextCall = this.setNextCall.bind(this);
    this.nextCall = this.nextCall.bind(this);
  }

  changeStart() {

  }

  addLink() {

  }

  moveLink() {

  }

  removeLink() {

  }

  setNextCall() {

  }

  nextCall () {

  }

};

module.exports = LinkedList;
