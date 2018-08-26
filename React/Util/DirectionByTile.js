
import TileMath from './TileMath';

const DirectionByTile = {

  checkI: function(tile, intent) {
    var dt = TileMath.directionToNumber;
    var returner = (tile.direction == intent) ? true :
      TileMath.plus(dt[intent], 2) == intent ? true :
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
    var dt = TileMath.directionToNumber;
    return tile.direction == intent ? true :
      dt[tile.direction] == TileMath.minus(dt[intent], 1) ? true :
      dt[tile.direction] == TileMath.plus(dt[intent], 1) ? true :
      false;
  },

  checkX: function(direction, intent) {
    return true;
  },
}

export default DirectionByTile;
