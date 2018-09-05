
import React from 'react';

import FieldContainer from './Components/FieldContainer.react';
import InfoContainer from './Components/InfoContainer.react';

import StateManager from './StateManager';

class LinkApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = StateManager.getState(1);
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
      if (this.state.focusOn && this.keyInputRef) {

        this.keyInputRef.focus();
        StateManager.setFocus(false);
      }
    }

    this.sendMouseToInput = () => {
      StateManager.setFocus(true);
      this.setState(StateManager.getState());
    }
  }

  componentWillUpdate() {
    console.log('LinkApp will update');
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
    // E.preventDefault();
    console.log('YA');
    console.log(e);
    StateManager.attemptAction({key: e.key, code: e.code}, () => {
      StateManager.toggleForceUpdate(true);
      var newState = StateManager.getState();
      this.setState(newState);
    });
    return 0;
  }

  // Pass handle function for typing pw
  // FieldContainer: current pos, field state, event function
  // InfoContainer: pw, error, mode

  render() {

    console.log(this.state);

    return (
      <div className='total-screen main-container' >
        <div className='leftspace'>
          <input className='keyInput'
            value={this.state.keyField}
            type='text'
            onKeyDown={this.handleKeyInput}
            onChange={function(e) {
              return true;
            }}
            ref={this.setKeyInputRef}/>
          <div className='tile quad '>
            <div className='t1 qd qr qu'></div>
            <div className='t2 qd'></div>
            <div className='t3 qu'></div>
            <div className='t4 qr'></div>
          </div>
        </div>
        <FieldContainer gridField={this.state.field.gridField}
          position={this.state.field.pos}
          forceUpdate={this.state.forceUpdate}
          sendMouseFunc={this.sendMouseToInput}
          updateDoneFunc={() => {StateManager.toggleForceUpdate(false)}}/>
        <InfoContainer password={this.state.info.password}
          error={this.state.info.error}
          mode={this.state.info.mode}/>
      </div>
    );
  }
}

export default LinkApp;
