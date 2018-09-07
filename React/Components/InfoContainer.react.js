import React from 'react';

class InfoContainer extends React.Component {
  constructor(props) {
    super(props);
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
      </div>
    );
  }
}

export default InfoContainer;
