
/*
  U,d,l,r
  e,s,b
*/

const KeyInputs = {
  getAction: function(keyPressed) {
    console.log(keyPressed);

    if (keyPressed.key in this.keyPressList) {
      console.log(this.keyPressList[keyPressed.key]);
      return this.keyPressList[keyPressed.key];
    } else {
      return false;
    }
  },

  keyPressList: {
    ' ': 's',
    Shift: 't',
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
