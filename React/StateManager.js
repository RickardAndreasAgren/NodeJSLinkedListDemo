
import TranslateDirectionToImage from './Util/TranslateDirectionToImage';

// Current pos, field state, event function
// InfoContainer: pw, error, mode
var focusInput = false;
var inputValue = '0';
var xpos = 9;
var ypos = 9;
var password = '';
var error = '';
var placeOrMove = 'move'; // 'move' || 'place';
var lock = false;
var fieldMatrix = [];
for (var i = 0; i < 19; i++) {
  var newArray = [];
  for (var j = 0; i < 19; i++) {
    newArray.push('0');
  }

  fieldMatrix.push(newArray);
}

// 20px tile minimum

const StateManager = {
  getState: function() {
    return {
      field: {
        pos: { xpos, ypos },
        gridField: fieldMatrix,
      },
      info: {
        pw: password,
        err: error,
        mode: placeOrMove,
      },
      keyField: inputValue,
      focusOn: focusInput,
    };
  },

  setFocus: function(tof) {
    focusInput = tof;
    console.log('SMSF', tof);
    return 0;
  },

};

export default StateManager;
