
import TileMath from './TileMath';

const DirectionByTile = {

  checkI: function(tile, intent) {
    var dt = TileMath.getNumber(tile.direction);
    console.log('CI');
    var returner = (tile.direction == intent) ? true :
      TileMath.getDirection(TileMath.plus(dt, 2)) == intent ? true :
      false;
    return returner;
  },

  /*
    Origin, direction
  */

  checkL: function(tile, intent) {
    console.log('CL');
    return (tile.direction == intent || tile.origin == intent);
  },

  checkT: function(tile, intent) {
    console.log('CT');
    return tile.direction == intent ? true :
      TileMath.getNumber(tile.direction) == TileMath.minus(dt[intent], 1) ? true :
      TileMath.getNumber(tile.direction) == TileMath.plus(dt[intent], 1) ? true :
      tile.origin == intent ? true :
      false;
  },

  checkX: function(tile, intent) {
    console.log('CX');
    return true;
  },

  placeI: function(tile, intent) {
    console.log('PI');
    var returner = (tile.direction == intent) ? true : false;
    return returner;
  },

  placeL: function(tile, intent) {
    console.log('PL');
    var dt = TileMath.directionToNumber;
    return (intent == TileMath.minus(dt[tile.origin], 1) ||
      intent == TileMath.plus(dt[tile.origin], 1));
  },

  placeT: function(tile, intent) {
    console.log('PT');
    var dt = TileMath.directionToNumber;
    return tile.origin == TileMath.plus(dt[intent], 2) ? false :
      dt[tile.origin] == TileMath.minus(dt[intent], 1) ? true :
      dt[tile.origin] == TileMath.plus(dt[intent], 1) ? true :
      false;
  },

  placeX: function(tile, intent) {
    console.log('PX');
    return (intent != tile.origin);
  },
};

export default DirectionByTile;
