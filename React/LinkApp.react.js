
import React from 'react';

import FieldContainer from './Components/FieldContainer.react';
import InfoContainer from './Components/InfoContainer.react';

import StateManager from './StateManager';

class LinkApp extends React.Component {
  constructor(props) {
    super(props);

    this.keyInputRef = null;
    this.needInit = true;

    this.fireUpdate = this.fireUpdate.bind(this);
    this.componentWillUpdate = this.componentWillUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    //This.sendMouseToInput = this.sendMouseToInput.bind(this);
    this.handleKeyInput = this.handleKeyInput.bind(this);

    this.state = StateManager.getState();

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

  fireUpdate() {
    this.setState(StateManager.getState());
  }

  componentWillUpdate() {
    console.log('LinkApp will update');
  }

  componentDidMount() {
    console.log('DidMount');
    console.log(this.state);
    if (this.needInit) {
      this.needInit = false
      StateManager.init(this.fireUpdate);
    }

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
          <div style={{height: '50px'}}>
            <div className='tile quad '>
              <div className='t1 qd qr'></div>
              <div className='t2 qd ql'></div>
              <div className='t3 qu qr'></div>
              <div className='t4 ql qu'></div>
            </div>
          </div>
          <div style={{height: '50px'}}>
            <div className='tile quad'>
              <div className='t1 pd pr'></div>
              <div className='t2 pd pl'></div>
              <div className='t3 pu pr'></div>
              <div className='t4 pl pu'></div>
            </div>
          </div>
        </div>
        { this.state.drawField &&
          <FieldContainer gridField={this.state.field.gridField}
            position={this.state.field.pos}
            forceUpdate={this.state.forceUpdate}
            sendMouseFunc={this.sendMouseToInput}
            updateDoneFunc={() => {StateManager.toggleForceUpdate(false)}}/>
        }
        { this.state.info &&
          <InfoContainer password={this.state.info.pw}
            error={this.state.info.error}
            mode={this.state.info.mode}/>
        }
      </div>
    );
  }
}

export default LinkApp;
