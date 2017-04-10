import React from 'react';

import Day from './Day.jsx';

class Week extends React.Component {
  calcDate(day) {
    let newDate = new Date(
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

export default Week;
