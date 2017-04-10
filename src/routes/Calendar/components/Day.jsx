import React from 'react';

class Day extends React.Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '10px',
    };

    const textStyle = {
      color: '#000001',
    };

    if (this.props.date.getDay() === 0 ||
        this.props.date.getDay() === 6) {
      style.backgroundColor = '#865cd6';
      textStyle.color = '#FFFFFF';
    }

    return (
      <div style={style}>
        <h3 style={textStyle}>{this.props.date.getDate()}</h3>
      </div>
    );
  }
}

Day.propTypes = {
  date: React.PropTypes.shape({
    getDay: React.PropTypes.func.isRequired,
    getDate: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default Day;
