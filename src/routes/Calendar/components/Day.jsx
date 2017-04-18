import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { dateToKey } from 'server/appointments.js';
import { setDate } from 'redux/actions.js';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0)',
      scheduled: this.checkScheduled(),
      month: this.checkMonth(),
    };

    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.onUpdate(() => {
      if (prevProps.currentDate.month !== this.props.currentDate.month) {
        this.setState({
          scheduled: this.checkScheduled(),
          month: this.checkMonth(),
        });
      }
    });
  }

  onUpdate(callback) {
    callback();
  }

  handleMouseLeave() {
    this.setState({
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0)',
    });
  }

  handleMouseEnter() {
    this.setState({
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.4)',
    });
  }

  handleClick() {
    this.props.dispatch(setDate({
      day: this.props.date.getDate(),
    }));
    this.props.history.push('/calendar/schedule');
  }

  checkMonth() {
    let month = true;

    if (this.props.date.getMonth() !== this.props.currentDate.month) {
      month = false;
    }

    return month;
  }

  checkScheduled() {
    let minutes;

    for (let j = 8; j < 17; j += 1) {
      for (let k = 0; k < 2; k += 1) {
        minutes = k * 30;

        if (!this.props.appointments.has(dateToKey(new Date(
          this.props.date.getFullYear(),
          this.props.date.getMonth(),
          this.props.date.getDate(),
          j,
          minutes,
        )))) {
          return false;
        }
      }
    }

    return true;
  }

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
    const active = {
      role: 'button',
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
      onClick: this.handleClick,
    };

    if (this.state.scheduled) {
      style.backgroundColor = '#865cd6';
      textStyle.color = '#FFFFFF';
    }

    if (!this.state.month) {
      active.role = null;
      active.onMouseEnter = null;
      active.onMouseLeave = null;
      active.onClick = null;
    } else {
      style.boxShadow = this.state.boxShadow;
    }

    return (
      <div style={style} {...active}>
        <h3 style={textStyle}>{this.props.date.getDate()}</h3>
      </div>
    );
  }
}

Day.propTypes = {
  date: React.PropTypes.shape({
    getDay: React.PropTypes.func.isRequired,
    getDate: React.PropTypes.func.isRequired,
    getMonth: React.PropTypes.func.isRequired,
    getFullYear: React.PropTypes.func.isRequired,
  }).isRequired,
  currentDate: React.PropTypes.shape({
    month: React.PropTypes.number.isRequired,
  }).isRequired,
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  appointments: React.PropTypes.shape({
    has: React.PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    currentDate: state.date,
    appointments: state.appointments,
  };
}

export default connect(mapStateToProps)(withRouter(Day));
