import React from 'react';
import { connect } from 'react-redux';

import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import logger from 'logger/logger.js';
import { dateToKey } from 'server';
import { setDate } from 'redux/actions.js';
import { CALENDAR_PATHS } from 'utilities/calendar.js';

class Schedule extends React.Component {
  constructor(props) {
    super(props);
    this.times = [];

    let minutes;
    for (let j = 8; j < 17; j += 1) {
      for (let k = 0; k < 2; k += 1) {
        minutes = k * 30;

        this.times.push({
          hour: j,
          minute: minutes,
        });
      }
    }

    this.makeItem = this.makeItem.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(index) {
    const location = this.props.location.pathname;

    this.props.dispatch(setDate({
      hour: this.times[index].hour,
      minute: this.times[index].minute,
    }));

    switch (location) {
      case CALENDAR_PATHS.PATIENT_SCHEDULE:
        this.props.history.push(CALENDAR_PATHS.APPOINTMENT);
        break;
      case CALENDAR_PATHS.DOCTOR_SCHEDULE:
        this.props.history.push(CALENDAR_PATHS.PATIENT);
        break;
      case CALENDAR_PATHS.APPOINTMENT_SCHEDULE:
        this.props.history.push(CALENDAR_PATHS.APPOINTMENT);
        break;
      default:
        logger.error(`No such path exists (schedule.jsx): ${location}`);
    }
  }

  handleClose() {
    const location = this.props.location.pathname;

    switch (location) {
      case CALENDAR_PATHS.PATIENT_SCHEDULE:
        this.props.history.push(CALENDAR_PATHS.PATIENT);
        break;
      case CALENDAR_PATHS.DOCTOR_SCHEDULE:
        this.props.history.push(CALENDAR_PATHS.DOCTOR_CALENDAR);
        break;
      case CALENDAR_PATHS.APPOINTMENT_SCHEDULE:
        this.props.history.push(CALENDAR_PATHS.APPOINTMENT);
        break;
      default:
        logger.error(`No such path exists (schedule.jsx): ${location}`);
    }
  }

  makeItem(element, index) {
    const hour = element.hour;
    const minute = element.minute;
    const date = new Date(
      this.props.date.year,
      this.props.date.month,
      this.props.date.day,
      hour,
      minute,
    );
    let color = null;
    let available = null;
    let click = this.handleClick.bind(this, index);
    const time = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    const textStyle = {};
    const location = this.props.location.pathname;
    let test;

    switch (location) {
      case CALENDAR_PATHS.PATIENT_SCHEDULE:
        if (this.props.appointments.has(dateToKey(date))) {
          test = true;
        } else {
          test = false;
        }

        break;
      case CALENDAR_PATHS.DOCTOR_SCHEDULE:
        if (this.props.appointments.has(dateToKey(date))) {
          test = true;
        } else {
          test = false;
        }

        break;
      case CALENDAR_PATHS.APPOINTMENT_SCHEDULE:
        if (this.props.appointments.has(dateToKey(date))) {
          test = false;
        } else {
          test = true;
        }

        break;
      default:
        logger.error(`No such path exists (schedule.jsx): ${location}`);
    }

    if (test) {
      color = 'brand';
      available = 'scheduled';
      textStyle.color = '#FFFFFF';
    } else {
      click = null;
      color = 'light-1';
      available = 'unscheduled';
      textStyle.color = '#000001';
    }

    return (
      <ListItem
        key={index}
        colorIndex={color}
        onClick={click}
        responsive={false}
        justify='between'
        direction='row'
      >
        <span style={textStyle}>
          {time}
        </span>
        <span style={textStyle}>
          {available}
        </span>
      </ListItem>
    );
  }

  render() {
    return (
      <Layer
        closer
        flush={false}
        align='center'
        onClose={this.handleClose}
      >
        <Box full>
          <List>
            {this.times.map(this.makeItem)}
          </List>
        </Box>
      </Layer>
    );
  }
}

Schedule.propTypes = {
  date: React.PropTypes.shape({
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
    day: React.PropTypes.number.isRequired,
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
    date: state.date,
    appointments: state.appointments,
  };
}

export default connect(mapStateToProps)(Schedule);
