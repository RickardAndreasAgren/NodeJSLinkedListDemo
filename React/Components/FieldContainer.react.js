
import React from 'react';


/*
  gridfield: [][]
  position: {x,y}
*/

class FieldContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
    };

    this.checkWidth = this.checkWidth.bind(this);
    this.fieldWidthRef = React.createRef();
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
  }

  componentDidMount() {
    this.setState({ width: this.fieldWidthRef.current.offsetWidth });
  }

  componentDidUpdate() {
    this.setState({ width: this.fieldWidthRef.current.offsetWidth });
  }

  checkWidth(e) {
    console.log(this.fieldWidthRef.current.offsetWidth);
    return 0;
  }

  render() {
    console.log(this.state.width);
    return (
      <div className='fieldcontainer total-screen'
        ref={this.fieldWidthRef}>
        <p>
          Time to build this demo!
        </p>
        <input type='button' onClick={this.checkWidth}>
        </input>
      </div>
    );
  }
}

export default FieldContainer;
