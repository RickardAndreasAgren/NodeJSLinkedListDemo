
const TileMath = {

  directionToNumber: {
    U: 1,
    R: 2,
    D: 3,
    L: 4,
  },

  getNumber: function(direction) {
    return this.directionToNumber[direction];
  },

  numberToDirection: {
    1: 'U',
    2: 'R',
    3: 'D',
    4: 'L',
  },

  getDirection: function(number) {
    return this.numberToDirection[number];
  },

  plus: function(i, a) {
    var returner = null;
    if (i + a < 5) {
      returner = i + a;
    } else {
      returner = (i + a) - 4;
    }
    return returner;
  },

  minus: function(i, a) {
    var returner = null;
    if (i > a) {
      returner = i - a;
    } else {
      returner = 4 - (a - i);
    }
    return returner;
  },
}

module.exports = TileMath;
