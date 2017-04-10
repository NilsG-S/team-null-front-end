import React from 'react';

import Day from './Day.jsx';

class Week extends React.Component {
  calcDate(day) {
    const newDate = new Date(
      this.props.date.getFullYear(),
      this.props.date.getMonth(),
      this.props.date.getDate(),
    );

    const current = newDate.getDate();
    newDate.setDate(current + day);

    return newDate;
  }

  render() {
    const style = {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    };

    return (
      <div style={style}>
        <Day date={this.calcDate(0)} />
        <Day date={this.calcDate(1)} />
        <Day date={this.calcDate(2)} />
        <Day date={this.calcDate(3)} />
        <Day date={this.calcDate(4)} />
        <Day date={this.calcDate(5)} />
        <Day date={this.calcDate(6)} />
      </div>
    );
  }
}

Week.propTypes = {
  date: React.PropTypes.shape({
    getDate: React.PropTypes.func.isRequired,
    getMonth: React.PropTypes.func.isRequired,
    getFullYear: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default Week;
