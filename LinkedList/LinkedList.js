
var LinkedI = require('./LinkedI');
var LinkedL = require('./LinkedL');
var LinkedT = require('./LinkedT');
var LinkedX = require('./LinkedX');

var LinkedSearcher = require('./LinkedSearcher');

const linkoptions = {
  I: LinkedI,
  L: LinkedL,
  T: LinkedT,
  X: LinkedX,
};

class LinkedList {
  constructor() {
    var starter = new LinkedI('start', 0, 'U','D');
    this.start = starter;
    this.activeLink = starter;
    this.idCounter = 0;

    this.changeStart = this.changeStart.bind(this);
    this.addLink = this.addLink.bind(this);
    this.traverseLink = this.traverseLink.bind(this);
    this.removeLink = this.removeLink.bind(this);
    this.printList = this.printList.bind(this);
  }

  changeStart() {
    return false;
  }

  addLink(direction, type, entrance) {
    console.log('Adding Link');
    console.log(type);
    console.log(this.activeLink.direction);
    console.log(entrance);
    var newLink = new linkoptions[type](this.activeLink,
      this.idCounter, direction, entrance
    );
    this.idCounter += 1;
    newLink.prev = this.activeLink;
    this.activeLink.setNext({obj: newLink, exit: entrance});
    this.activeLink = newLink;
    newLink.printMe();
    return 0;
  }

  traverseLink(direction, connectTo) {
    console.log('Traversing Link');
    console.log(direction);
    var _this = this;
    return new Promise((resolve,reject) => {
      return this.activeLink.move(direction);
    })
    .then(function(movedTo) {
      var returner = null;
      if (movedTo) {
        this.activeLink = movedTo;
        this.activeLink.printMe();
        returner = 0;
      } else if (connectTo) {
        returner = _this.connectTiles(direction, connectTo);
      } else {
        throw new Error('Bad move attempted.');
      }
      return returner;
    })
    .catch(function(err) {
      console.log(err);
      return false;
    })
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

  connectTiles(direction, connectId) {
    var _this = this;
    return new Promise((resolve,reject) => {
      resolve({
        entry: TileMath.getDirection(TileMath.plus(
          TileMath.getNumber(direction),2)
        ),
        id: connectId,
      })
    })
    .then(function(connector) {
      return _this.searchForConnector(connector);
    })
    .then(function(connectTo) {
      // {obj: Object, next: DIRECTION}
      setNext({obj: connectTo, next: direction});
      return true;
    })
    .catch((err) => {
      console.log(err);
      console.log(err.stack);
      throw new Error(err);
    })
  }

  async searchForConnector(connector) {
    var searchDirection = LinkedSearcher.find(connector,this);
    return searchDirection;
  }

  printList() {
    var chainString = this.start.printChain('');
    console.log(chainString);
    return chainString;
  }
};

module.exports = LinkedList;
