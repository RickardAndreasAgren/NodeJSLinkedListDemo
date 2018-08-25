
import React from 'react';

import FieldContainer from './Components/FieldContainer.react';
import InfoContainer from './Components/InfoContainer.react';

import StateManager from './StateManager';
import KeyInputs from './Util/KeyInputs';

class LinkApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = StateManager.getState();
    this.keyInputRef = null;

    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    //This.sendMouseToInput = this.sendMouseToInput.bind(this);
    this.handleKeyInput = this.handleKeyInput.bind(this);

    this.setKeyInputRef = element => {
      this.keyInputRef = element;
    }

    this.focusKeyInputRef = () => {
      console.log('Focus: ');
      console.log(this.state.focusOn);
      if (this.state.focusOn && this.keyInputRef) {

        this.keyInputRef.focus();
        StateManager.setFocus(false);
        console.log('Focus disabled');
      }
    }

    this.sendMouseToInput = () => {
      console.log('Focus ON');
      console.log(this.keyInputRef);
      StateManager.setFocus(true);
      this.setState(StateManager.getState());
    }
  }

  componentWillUpdate() {
    // This.state = StateManager.getState();
    console.log('LinkApp will update');
    console.log(this.state);
  }

  componentDidMount() {
    console.log('DidMount');
    console.log(this.state);

    this.focusKeyInputRef();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('LinkApp updated');
    this.focusKeyInputRef();
  }

  handleKeyInput(e) {
    e.preventDefault();
    console.log('YA');
  }

  // Pass handle function for typing pw
  // FieldContainer: current pos, field state, event function
  // InfoContainer: pw, error, mode

  render() {

    return (
      <div className='total-screen main-container' >
        <div className='leftspace'>
          <input className='keyInput'
            value={this.state.keyField}
            type='text'
            onChange={this.handleKeyInput}
            ref={this.setKeyInputRef}/>
          <p>
          </p>
        </div>
        <FieldContainer gridField={this.state.field.gridField}
          position={this.state.field.pos}
          sendMouseFunc={this.sendMouseToInput}/>
        <InfoContainer password={this.state.info.password}
          error={this.state.info.error}
          mode={this.state.mode}/>
      </div>
  );
  }
}

export default LinkApp;
