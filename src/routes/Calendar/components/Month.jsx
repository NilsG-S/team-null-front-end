import React from 'react';

import Week from './Week.jsx';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 500,
    };

    this.resizeCalendar = this.resizeCalendar.bind(this);
    this.calcDate = this.calcDate.bind(this);
  }

  componentDidMount() {
    this.resizeCalendar();
    window.addEventListener('resize', this.resizeCalendar);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCalendar);
  }

  calcDate(week) {
    let newDate = new Date(
      this.props.date.getFullYear(),
      this.props.date.getMonth(),
      1,
    );

    const diff = newDate.getDay();
    const current = newDate.getDate();
    newDate.setDate(current - diff + (week - 1) * 7);

    return newDate;
  }

  resizeCalendar() {
    const element = document
      .getElementById('routes-calendar-components-calendar-box-1');
    const newHeight = element.clientHeight;
    const newWidth = element.clientWidth;
    let newSize;

    if (newWidth > newHeight) {
      newSize = newHeight;
    } else {
      newSize = newWidth;
    }

    this.setState({
      size: newSize,
    });
  }

  render() {
    const style = {
      height: this.state.size,
      width: this.state.size,
      display: 'flex',
      flexDirection: 'column',
    };

    return (
      <div style={style}>
        <Week date={this.calcDate(1)} />
        <Week date={this.calcDate(2)} />
        <Week date={this.calcDate(3)} />
        <Week date={this.calcDate(4)} />
        <Week date={this.calcDate(5)} />
        <Week date={this.calcDate(6)} />
      </div>
    );
  }
}

export default Month;
