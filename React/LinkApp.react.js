
import React from 'react';

import FieldContainer from './Components/FieldContainer.react';
import InfoContainer from './Components/InfoContainer.react';

import StateManager from './StateManager';

class LinkApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = StateManager.getState();
  }

  // pass handle function for typing pw
  // FieldContainer: current pos, field state, event function
  // InfoContainer: pw, error, mode

  render() {
    return (
      <div className='total-screen main' >
        <div className='leftspace'>
          <p>
          </p>
        </div>
        <FieldContainer gridField={this.state.field.gridField}
          position={this.state.field.pos} />
        <InfoContainer password={this.state.info.password}
          error={this.state.info.error}
          mode={this.state.mode}/>
      </div>
  );
  }
}

export default LinkApp;
