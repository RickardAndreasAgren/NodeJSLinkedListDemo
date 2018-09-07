import React from 'react';

import FieldTile from './FieldTile.react';

class FieldLayout extends React.Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);

    this.getHeight = this.getHeight.bind(this);
    this.getWidth = this.getWidth.bind(this);
    this.buildMatrix = this.buildMatrix.bind(this);
  }

  // 2-dimensional
  /* Props
    gridField
    position {xpos, ypos}
    placed
    width
    forceUpdate
    updateDoneFunc
  */

  shouldComponentUpdate(nextProps, nextState) {
    var returner = true;
    if (nextProps.forceUpdate) {
      returner = true;
    } else if (this.state == nextState && this.props == nextProps) {
      returner = false;
    }
    return returner;
  }

  componentDidUpdate() {
    this.props.updateDoneFunc();
  }

  getHeight() {
    return this.props.gridField[0].length;
  }

  getWidth() {
    return this.props.gridField.length;
  }

  buildMatrix() {
    console.log('Building matrix');
    console.log(this.props.gridField);
    var activeCell = this.props.position.xpos * this.getHeight() +
      this.props.position.ypos;
    var currentCell = 0;

    return this.props.gridField.map(function(columnValues, x) {
      var y = 0;
      var column = columnValues.map(function(value, y) {
        var active = currentCell === activeCell;
        var cell = <FieldTile key={x + '-' + y} x={x} y={y}
          origin={value.origin} direction={value.direction}
          tile={value.tileType} selected={active} placed={value.placed}/>
        currentCell++;
        return cell;
      }, this);
      var col = <div className='fieldcolumn' key={x}>{column}</div>
      return col;
    }, this);
  }

  render() {
    var size = this.props.width;

    var columns = this.buildMatrix();

    return (
      <div className='fieldbottom' style={{width: size, height: size}}>
        <div className='fieldlayout'>
          {columns}
        </div>
      </div>
    );
  }
}

export default FieldLayout;
