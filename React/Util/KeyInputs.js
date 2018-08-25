
/*
  U,d,l,r
  e,s,b
*/

const KeyInputs = {
  getAction: function(keyPressed) {
    if (keyPressed.code = 'Space') {
      return 's';
    }

    if (keyPressed.key in keyPressList) {
      console.log(this.keyPressList[keyPressed.key]);
      return this.keyPressList[keyPressed.key];
    } else {
      throw new Error('')
    }
  },

  keyPressList: {
    Enter: 'e',
    Control: 'e',
    Backspace: 'b',
    ArrowUp: 'U',
    ArrowDown: 'D',
    ArrowLeft: 'L',
    ArrowRight: 'R',
  },
}

export default KeyInputs;
