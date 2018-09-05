
import React from 'react';

import TranslatePropsToTile from '../Util/TranslatePropsToTile';

class FieldTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.componentDidMount = this.componentDidMount.bind(this);
    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
  }

  /* Props
  key "X-Y"
  x
  y
  origin
  direction
  tile
  selected
  */

  componentDidMount() {
    this.props.tile != 'e' ? console.log(this.props.tile) : null;
    if (this.props.tile && !this.state.display) {
      var _this = this;
      this.props.tile != 'e' ? console.log('Tile did mount and set') : null;
      new Promise((resolve,reject) => {
        var returner = TranslatePropsToTile.translateTile(
          this.props.origin,
          this.props.direction,
          this.props.tile
        );
        resolve(returner);
      })
      .then(function(setThis) {
        _this.setState(setThis);
      })
      .catch(function(err) {
        console.log('Tile updated issue');
        console.log(err);
      })
    }
  }

  shouldComponentUpdate(nextProps,nextState) {
    return true;
  }

  componentDidUpdate(prevProps) {
    this.props.tile != 'e' ? console.log('Tile did update') : null;
    if (prevProps.tile != this.props.tile) {
      var _this = this;
      this.props.tile != 'e' ? console.log('Tile did update and set') : null;
      this.props.tile != 'e' ? console.log(this.props) : null;
      this.props.tile != 'e' ? console.log(this.state) : null;
      return new Promise((resolve,reject) => {
        var returner = TranslatePropsToTile.translateTile(
          this.props.origin,
          this.props.direction,
          this.props.tile
        );
        resolve(returner);
      })
      .then(function(setThis) {
        _this.setState(setThis);
        return false;
      })
      .catch(function(err) {
        console.log('Tile updated issue');
        console.log(err);
      })
    }
  }

  render() {
    this.props.tile != 'e' ? console.log('Tile rendered') : null;
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
