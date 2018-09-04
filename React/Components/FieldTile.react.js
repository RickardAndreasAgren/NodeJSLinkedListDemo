
import React from 'react';


class FieldTile extends React.Component {
  constructor(props) {
    super(props);

    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
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

  componentDidMount() {
    this.setState({ displayTile: })
  }

  componentDidUpdate() {

  }

  render() {
    var selected = this.props.selected ? this.props.selected : false;

    var tileClass = selected ? 'tile quad selected' : 'tile quad';

    var t1 = this.state.t1 ? 't1 ' + this.state.t1 : 't1';
    var t2 = this.state.t2 ? 't2 ' + this.state.t2 : 't2';
    var t3 = this.state.t3 ? 't3 ' + this.state.t3 : 't3';
    var t4 = this.state.t4 ? 't4 ' + this.state.t4 : 't4';

    return (
      <div className={tileClass} x={this.props.x} y={this.props.y}>
        <div className={t1}></div>
        <div className={t2}></div>
        <div className={t3}></div>
        <div className={t4}></div>
      </div>
    );
  }
}

export default FieldTile;
