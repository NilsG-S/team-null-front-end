import React from 'react';
import { connect } from 'react-redux';

import Week from './Week.jsx';
import Weekdays from './Weekdays.jsx';

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
    const newDate = new Date(
      this.props.date.year,
      this.props.date.month,
      1,
    );

    const diff = newDate.getDay();
    const current = newDate.getDate();
    newDate.setDate((current - diff) + ((week - 1) * 7));

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
        <Weekdays />
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

Month.propTypes = {
  date: React.PropTypes.shape({
    month: React.PropTypes.number.isRequired,
    year: React.PropTypes.number.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    date: state.date,
  };
}

export default connect(mapStateToProps)(Month);
