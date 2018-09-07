
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
    return (tile.direction == intent || tile.origin == intent);
  },

  checkT: function(tile, intent) {
    return tile.direction == intent ? true :
      TileMath.getNumber(tile.direction) == TileMath.minus(dt[intent], 1) ? true :
      TileMath.getNumber(tile.direction) == TileMath.plus(dt[intent], 1) ? true :
      tile.origin == intent ? true :
      false;
  },

  checkX: function(tile, intent) {
    return true;
  },

  placeI: function(tile, intent) {
    var returner = (tile.direction == intent) ? true : false;
    return returner;
  },

  placeL: function(tile, intent) {
    var dt = TileMath.directionToNumber;
    return (intent == TileMath.minus(dt[tile.origin], 1) ||
      intent == TileMath.plus(dt[tile.origin], 1));
  },

  placeT: function(tile, intent) {
    var dt = TileMath.directionToNumber;
    return tile.origin == TileMath.plus(dt[intent], 2) ? false :
      dt[tile.origin] == TileMath.minus(dt[intent], 1) ? true :
      dt[tile.origin] == TileMath.plus(dt[intent], 1) ? true :
      false;
  },

  placeX: function(tile, intent) {
    return (intent != tile.origin);
  },
};

export default DirectionByTile;
