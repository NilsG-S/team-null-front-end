import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setDate, AuthStates } from 'redux/actions.js';
import { oneFree, oneFilled } from 'utilities/check-day.js';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0)',
      scheduled: false,
      month: false,
    };

    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    this.checkScheduled();
    this.checkMonth();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.appointments !== this.props.appointments) {
      this.checkScheduled();
      this.checkMonth();
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
    this.props.dispatch(setDate({
      day: this.props.date.getDate(),
    }));

    if (this.props.edit) {
      this.props.history.push('/appointment/schedule');
    } else {
      this.props.history.push('/calendar/schedule');
    }
  }

  checkMonth() {
    if (this.props.date.getMonth() !== this.props.currentDate.month) {
      this.setState({
        month: false,
      });
    } else {
      this.setState({
        month: true,
      });
    }
  }

  checkScheduled() {
    if (this.props.type === AuthStates.DOCTOR ||
        this.props.type === AuthStates.NURSE) {
      this.setState({
        scheduled: oneFilled(this.props.appointments, this.props.date),
      });
    } else {
      this.setState({
        scheduled: oneFree(this.props.appointments, this.props.date),
      });
    }
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

    if (this.state.scheduled && this.state.month) {
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
  edit: React.PropTypes.bool.isRequired,
  type: React.PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    currentDate: state.date,
    appointments: state.appointments,
    edit: state.edit,
    type: state.user.type,
  };
}

export default connect(mapStateToProps)(withRouter(Day));
