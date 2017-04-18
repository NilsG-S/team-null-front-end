import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Layer from 'grommet/components/Layer';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { dateToKey } from 'server/appointments.js';
import { setDate } from 'redux/actions.js';

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
    // this.props.dispatch(setDate({
    //   hour: this.props.date.getDate(),
    // }));
    this.props.history.push('/appointment');
  }

  handleClose() {
    this.props.history.push('/calendar');
  }

  makeItem(element) {
    let color = null;

    if (this.props.appointments.has(dateToKey(new Date(
      this.props.date.year,
      this.props.date.month,
      this.props.date.day,
      element.hour,
      element.minute,
    )))) {
      color = 'brand';
    } else {
      color = 'light-1';
    }

    return (
      <ListItem
        key={element.hour.toString() + ':' + element.minute.toString()}
        colorIndex={color}
        onClick={this.handleClick}
      >
        <span>
          Alan
        </span>
      </ListItem>
    );
  }

  render() {
    return (
      <Layer
        closer={true}
        flush={false}
        align='center'
        onClose={this.handleClose}
      >
        <List>
          {this.times.map(this.makeItem)}
        </List>
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
};

function mapStateToProps(state) {
  return {
    date: state.date,
    appointments: state.appointments,
  };
}

export default connect(mapStateToProps)(withRouter(Schedule));
