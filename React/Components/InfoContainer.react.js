import React from 'react';

class InfoContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='infocontainer'>
        <p>
          {this.props.mode}
        </p>
      </div>
    );
  }
}

export default InfoContainer;
