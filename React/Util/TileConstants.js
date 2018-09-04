
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
  horizontal: {
    display: 'h',
    t1: 'qd',
    t2: 'qd',
    t3: 'qu',
    t4: 'qu',
  },

  vertical: {
    display: 'v',
    t1: 'qr',
    t2: 'ql',
    t3: 'qr',
    t4: 'ql',
  },

  upleft: {
    display: 'ul',
    t1: 'qr qd',
    t2: 'ql',
    t3: 'qu',
    t4: '',
  },

  upright: {
    display: 'ur',
    t1: 'qr',
    t2: 'ql qd',
    t3: '',
    t4: 'qu',
  },

  downleft: {
    display: 'dl',
    t1: 'qd',
    t2: '',
    t3: 'qr qu',
    t4: 'ql',
  },

  downright: {
    display: 'dr',
    t1: '',
    t2: 'qd',
    t3: 'qr',
    t4: 'ql qu',
  },

  tcrossup: {
    display: 'tu',
    t1: 'qd qr',
    t2: 'qd ql',
    t3: 'qu',
    t4: 'qu',
  },

  tcrossdown: {
    display: 'td',
    t1: 'qd',
    t2: 'qd',
    t3: 'qu qr',
    t4: 'qu ql',
  },

  tcrossleft: {
    display: 'tl',
    t1: 'qd qr',
    t2: 'ql',
    t3: 'qu qr',
    t4: 'ql',
  },

  tcrossright: {
    display: 'tr',
    t1: 'ql',
    t2: 'qr qd',
    t3: 'ql',
    t4: 'qr qu',
  },

  crossing: {
    display: 'x',
    t1: 'qd qr',
    t2: 'qd ql',
    t3: 'qu qr',
    t4: 'qu ql',
  },

  empty: {
    display: 'e',
    t1: '',
    t2: '',
    t3: '',
    t4: '',
  },
};

export default TileConstants;
