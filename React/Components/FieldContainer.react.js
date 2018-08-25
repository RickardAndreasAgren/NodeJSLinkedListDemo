
import React from 'react';

import FieldLayout from './FieldLayout.react';
/*
  Gridfield: [][]
  position: {x,y}
  sendMouseFunc: function
*/

class FieldContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };

    this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentDidUpdate = this.componentDidUpdate.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    this.fieldContainerElement = React.createRef();
    this.checkWidth = this.checkWidth.bind(this);

    this.handleClickInside = this.handleClickInside.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    var returner = true;
    if (nextState.width == this.state.width) {
      if (nextProps.position.x == this.props.position.x &&
        nextProps.position.y == this.props.position.y) {
        returner = false;
      }
    }

    return returner;
  };

  componentDidMount() {
    this.setState({ width: this.fieldContainerElement.current.offsetWidth });

    this.checkWidth();
  };

  componentDidUpdate() {
    this.setState({ width: this.fieldContainerElement.current.offsetWidth });
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickInside);
  };


  checkWidth() {
    if (this.fieldContainerElement) {
      console.log(this.fieldContainerElement.current.offsetWidth);
    }
  };

  handleClickInside(e) {
    e.preventDefault();
    if (this.fieldContainerElement.current &&
      this.fieldContainerElement.current.contains(e.target)
    ) {
      this.props.sendMouseFunc();
    }
  };

  render() {

    document.addEventListener('mousedown', this.handleClickInside);

    return (
      <div className='fieldcontainer total-screen'
        ref={this.fieldContainerElement}>
        {this.state.width > 399 &&
          <FieldLayout gridField={this.props.gridField}
            position={this.props.position}/>
        }
      </div>
    );
  };
}

export default FieldContainer;
