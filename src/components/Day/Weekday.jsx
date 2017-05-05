import React from 'react';

class Weekday extends React.Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <div style={style}>
        <h3>{this.props.name}</h3>
      </div>
    );
  }
}

Weekday.propTypes = {
  name: React.PropTypes.string.isRequired,
};

export default Weekday;
