

import TileConstants from './TileConstants';
import TileMath from './TileMath';

/* .
  origin
  direction
  tileType
*/

const TranslatePropsToTile = {

  // Take tile info and return state
  translateTile: function(origin, direction, type) {
    return new Promise((resolve,reject) => {
      resolve(this.defineByType(origin, direction, type));
    })
    .then(function(tileString) {
      var returner = null;
      if (tileString) {
        returner = TileConstants[tileString];
      } else {
        throw new Error('Failed to interpret tile');
      }
    })
  },

  defineByType(origin, direction, type) {
    var returner = null;
    switch (type) {
      case 'I': {
        returner = origin == 'U' || origin == 'D' ? 'vertical' :
          origin == 'L' || origin == 'R' ? 'horizontal': 'empty';
        break;
      }
      case 'L': {
        returner = this.translateL(origin, direction);
        break;
      }
      case 'T': {
        returner = this.translateT(origin, direction);
        break;
      }
      case 'X': {
        returner = 'crossing';
        break;
      }
      default: {
        console.log('This is not a place the code should find.');
        throw new Error('Invalid type');
        break;
      }
    }
    return returner;
  },

  translateL: function(origin, direction) {
    var options = {
      1: {2: 'upright', 4: 'upleft'},
      2: {1: 'upright', 3: 'downright'},
      3: {2: 'downright', 4: 'downleft'},
      4: {1: 'upleft', 3: 'downleft'},
    };
    return options[TileMath.getNumber(origin)][TileMath.getNumber(direction)];
  },

  /*
    In a T, direction can not be opposite. O=D means splitting T.
  */

  translateT: function(origin, direction) {
    var returner = null;
    var options = {
      1: 'tcrossup',
      2: 'tcrossright',
      3: 'tcrossdown',
      4: 'tcrossleft',
    };
    var on = TileMath.getNumber(origin);
    var dn = Tilemath.getNumber(origin);

    if (on == dn) {
      returner = options[on];
    } else {
      returner = options[dn];
    }
    return returner;
  },

}

export default TranslatePropsToTile;