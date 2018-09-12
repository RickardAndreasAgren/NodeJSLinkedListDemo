
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
    var dt = TileMath.directionToNumber;
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
    return returner = (tile.direction == intent) ? true : false;
  },

  placeL: function(tile, intent) {
    console.log('PL');
    console.log(tile);
    console.log(intent);
    var dt = TileMath.directionToNumber;
    return (intent == TileMath.minus(dt[tile.origin], 1) ||
      intent == TileMath.plus(dt[tile.origin], 1));
  },

  placeT: function(tile, intent) {
    console.log('PT');
    var dt = TileMath.directionToNumber;
    return dt[tile.origin] == TileMath.plus(dt[intent], 2) ? false :
      dt[tile.origin] == TileMath.minus(dt[intent], 1) ? true :
      dt[tile.origin] == TileMath.plus(dt[intent], 1) ? true :
      false;
  },

  placeX: function(tile, intent) {
    console.log('PX');
    return (intent != tile.origin);
  },

  validI: function(tile) {
    return (tile.direction == TileMath.getDirection(
      TileMath.plus(TileMath.getNumber(tile.origin),2)));
  },

  validL: function(tile) {
    var dt = TileMath.directionToNumber;
    return (tile.direction == TileMath.minus(dt[tile.origin], 1) ||
      tile.direction == TileMath.plus(dt[tile.origin], 1));
  },

  validT: function(tile) {
    var dt = TileMath.directionToNumber;
    return dt[tile.origin] == TileMath.plus(dt[tile.direction], 2) ? false :
      dt[tile.origin] == TileMath.minus(dt[tile.direction], 1) ? true :
      dt[tile.origin] == TileMath.plus(dt[tile.direction], 1) ? true :
      false;
  },

  validX: function(tile) {
    return true;
  },

  defaultI: function(tile) {
    return TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(tile.origin), 2));
  },

  defaultL: function(tile) {
    return TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(tile.origin), 1));
  },

  defaultT: function(tile) {
    return tile.origin;
  },

  defaultX: function(tile) {
    return TileMath.getDirection(TileMath.plus(
      TileMath.getNumber(tile.origin), 2));
  },
};

export default DirectionByTile;
