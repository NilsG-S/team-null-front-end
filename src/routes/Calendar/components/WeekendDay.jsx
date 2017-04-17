import React from 'react';

class WeekendDay extends React.Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '10px',
      backgroundColor: '#865cd6',
    };

    const textStyle = {
      color: '#FFFFFF',
    };

    return (
      <div style={style}>
        <h3 style={textStyle}>{this.props.date.getDate()}</h3>
      </div>
    );
  }
}

WeekendDay.propTypes = {
  date: React.PropTypes.shape({
    getDate: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default WeekendDay;
