import React from 'react';

import Day from './Day.jsx';

class Week extends React.Component {
  calcDay(day) {
    let newDate = new Date(
      this.props.date.getFullYear(),
      this.props.date.getMonth(),
      this.props.date.getDate(),
    );

    const current = newDate.getDate();
    newDate.setDate(current + day);

    return newDate.getDate();
  }

  render() {
    const style = {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    };

    return (
      <div style={style}>
        <Day day={this.calcDay(0)} />
        <Day day={this.calcDay(1)} />
        <Day day={this.calcDay(2)} />
        <Day day={this.calcDay(3)} />
        <Day day={this.calcDay(4)} />
        <Day day={this.calcDay(5)} />
        <Day day={this.calcDay(6)} />
      </div>
    );
  }
}

export default Week;
