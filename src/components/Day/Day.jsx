import React from 'react';
import { connect } from 'react-redux';

import logger from 'logger/logger.js';
import { setDate } from 'redux/actions.js';
import { oneFree, oneFilled } from 'utilities/calendar.js';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0)',
      active: false,
    };

    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.checkActive();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appointments !== this.props.appointments) {
      this.checkActive();
    }
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
    const location = this.props.location.pathname;

    this.props.dispatch(setDate({
      day: this.props.date.getDate(),
    }));

    switch (location) {
      case '/patients/calendar':
        this.props.history.push('/patients/schedule');
        break;
      case '/calendar':
        this.props.history.push('/calendar/schedule');
        break;
      case '/appointments/calendar':
        this.props.history.push('/appointment/schedule');
        break;
      default:
        logger.error(`No such path exists (Day.jsx): ${location}`);
    }
  }

  checkActive() {
    const location = this.props.location.pathname;
    const month = this.props.date.getMonth() !== this.props.currentDate.month;
    let day;

    switch (location) {
      case '/patients/calendar':
        day = oneFilled(this.props.appointments, this.props.date);
        break;
      case '/calendar':
        day = oneFilled(this.props.appointments, this.props.date);
        break;
      case '/appointments/calendar':
        day = oneFree(this.props.appointments, this.props.date);
        break;
      default:
        logger.error(`No such path exists (Day.jsx): ${location}`);
    }

    this.setState({
      active: month && day,
    });
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

    if (this.state.active) {
      style.backgroundColor = '#865cd6';
      textStyle.color = '#FFFFFF';
      style.boxShadow = this.state.boxShadow;
    } else {
      active.role = null;
      active.onMouseEnter = null;
      active.onMouseLeave = null;
      active.onClick = null;
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
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    currentDate: state.date,
    appointments: state.appointments,
  };
}

export default connect(mapStateToProps)(Day);
