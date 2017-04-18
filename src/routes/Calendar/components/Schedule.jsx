import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { dateToKey } from 'server/appointments.js';
import { setDate, AuthStates, toggleEdit } from 'redux/actions.js';

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
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    const children = event.target.childNodes;
    const key = children[0].innerHTML.split(':');

    this.props.dispatch(setDate({
      hour: parseInt(key[0], 10),
      minute: parseInt(key[1], 10),
    }));

    if (this.props.edit) {
      this.props.dispatch(toggleEdit());
    }

    if (this.props.type === AuthStates.STAFF) {
      this.props.history.push('/appointment');
    } else {
      this.props.history.push('/record');
    }
  }

  handleClose() {
    if (this.props.edit) {
      this.props.dispatch(toggleEdit());
      this.props.history.push('/appointment');
    } else {
      this.props.history.push('/calendar');
    }
  }

  makeItem(element) {
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
    let click = this.handleClick;
    const key = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric' });
    const textStyle = {};

    if (this.props.appointments.has(dateToKey(date))) {
      color = 'brand';
      available = 'scheduled';
      textStyle.color = '#FFFFFF';
    } else {
      if (this.props.type === AuthStates.DOCTOR ||
          this.props.type === AuthStates.NURSE) {
        click = null;
      }

      color = 'light-1';
      available = 'unscheduled';
      textStyle.color = '#000001';
    }

    return (
      <ListItem
        key={key}
        colorIndex={color}
        onClick={click}
        responsive={false}
        justify='between'
        direction='row'
      >
        <span style={textStyle}>
          {key}
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
  type: React.PropTypes.number.isRequired,
  edit: React.PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    date: state.date,
    appointments: state.appointments,
    type: state.user.type,
    edit: state.edit,
  };
}

export default connect(mapStateToProps)(withRouter(Schedule));
