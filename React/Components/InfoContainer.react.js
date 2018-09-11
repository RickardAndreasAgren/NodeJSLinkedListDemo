import React from 'react';

class InfoContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handlePasswordInput = this.handlePasswordInput.bind(this);

    this.setPasswordInputRef = element => {
      this.pwiRef = element;
    }
  }

  handlePasswordInput(e) {
    console.log('test');
    console.log(e.target.value);
    e.preventDefault();
    return this.props.handlePasswordInput(e.target.value);
  }

  render() {
    return (
      <div className='infocontainer'>
        <p>
          Shift: Swap from {this.props.mode}
        </p>
        <p>
          Arrows: Movement and placement direction intent
        </p>
        <p>
          Space: In place mode, change tile type
        </p>
        <p>
          Ctrl & Enter: In place mode, attempt to place tile
        </p>
        <p>
          Backspace: Start delete from current point
        </p>
        <input type='text' placeholder='Enter password'
          ref={this.setPasswordInputRef} value={this.props.password}
          onChange={this.handlePasswordInput}/>
        <p>
          Press tab to type password.
        </p>
        <p>
          Click on field to enable actions.
        </p>
      </div>
    );
  }
}

export default InfoContainer;
