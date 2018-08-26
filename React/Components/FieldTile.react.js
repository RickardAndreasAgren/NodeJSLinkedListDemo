
import React from 'react';


class FieldTile extends React.Component {
  constructor(props) {
    super(props);
  }

  /* Props
  key "X-Y"
  x
  y
  origin
  direction
  tileType
  selected
  */

  render() {
    var selected = this.props.selected ? this.props.selected : false;

    var tileClass = selected ? 'tile quad selected' : 'tile quad';

    return (
      <div className={tileClass} x={this.props.x} y={this.props.y}>
        <div className='t1 qd'></div>
        <div className='t2 qu'></div>
        <div className='t3 ql'></div>
        <div className='t4 qr'></div>
      </div>
    );
  }
}

export default FieldTile;
