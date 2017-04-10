import React from 'react';

class Day extends React.Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <div style={style}>
        <h3>{this.props.day}</h3>
      </div>
    );
  }
}

export default Day;
