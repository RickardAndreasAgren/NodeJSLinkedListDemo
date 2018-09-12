
/* .
horizontal h
vertical v
upleft ul
upright ur
downleft dl
downright dr
tcrossup tu
tcrossdown td
tcrossleft tl
tcrossright tr
crossing x
*/

const TileConstants = {
  horizontal: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'h',
      t1: prefix + 'd',
      t2: prefix + 'd',
      t3: prefix + 'u',
      t4: prefix + 'u',
    }
  },

  vertical: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'v',
      t1: prefix + 'r',
      t2: prefix + 'l',
      t3: prefix + 'r',
      t4: prefix + 'l',
    }
  },

  upleft: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'ul',
      t1: prefix + 'r ' + prefix + 'd',
      t2: prefix + 'l',
      t3: prefix + 'u',
      t4: '',
    }
  },

  upright: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'ur',
      t1: prefix + 'r',
      t2: prefix + 'l ' + prefix + 'd',
      t3: '',
      t4: prefix + 'u',
    }
  },

  downleft: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'dl',
      t1: prefix + 'd',
      t2: '',
      t3: prefix + 'r ' + prefix + 'u',
      t4: prefix + 'l',
    }
  },

  downright: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'dr',
      t1: '',
      t2: prefix + 'd',
      t3: prefix + 'r',
      t4: prefix + 'l ' + prefix + 'u',
    }
  },

  tcrossup: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'tu',
      t1: prefix + 'd ' + prefix + 'r',
      t2: prefix + 'd ' + prefix + 'l',
      t3: prefix + 'u',
      t4: prefix + 'u',
    }
  },

  tcrossdown: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'td',
      t1: prefix + 'd',
      t2: prefix + 'd',
      t3: prefix + 'u ' + prefix + 'r',
      t4: prefix + 'u ' + prefix + 'l',
    }
  },

  tcrossleft: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'tl',
      t1: prefix + 'd ' + prefix + 'r',
      t2: prefix + 'l',
      t3: prefix + 'u ' + prefix + 'r',
      t4: prefix + 'l',
    }
  },

  tcrossright: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'tr',
      t1: prefix + 'r',
      t2: prefix + 'l ' + prefix + 'd',
      t3: prefix + 'r',
      t4: prefix + 'l ' + prefix + 'u',
    }
  },

  crossing: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'x',
      t1: prefix + 'd ' + prefix + 'r',
      t2: prefix + 'd ' + prefix + 'l',
      t3: prefix + 'u ' + prefix + 'r',
      t4: prefix + 'u ' + prefix + 'l',
    }
  },

  empty: function(placed) {
    var prefix = placed ? 'q' : 'p';
    return {
      display: 'e',
      t1: '',
      t2: '',
      t3: '',
      t4: '',
    }
  },
};

export default TileConstants;
