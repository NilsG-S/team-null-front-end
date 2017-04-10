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
        <h3>{this.props.date.getDate()}</h3>
      </div>
    );
  }
}

Day.propTypes = {
  date: React.PropTypes.shape({
    getDate: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default Day;
