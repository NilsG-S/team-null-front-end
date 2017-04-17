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
      free: this.checkFree(),
    };

    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  componentDidUpdate(prevProps) {
    this.onUpdate(() => {
      if (prevProps.currentDate.month !== this.props.currentDate.month) {
        this.setState({
          free: this.checkFree(),
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

  checkFree() {
    let minutes;
    let free = true;

    if (this.props.date.getMonth() !== this.props.currentDate.month) {
      free = false;
    } else {
      for (let j = 8; j < 17; j += 1) {
        for (let k = 0; k < 2; k += 1) {
          minutes = k * 30;

          if (this.props.appointments.has(dateToKey(new Date(
            this.props.date.getFullYear(),
            this.props.date.getMonth(),
            this.props.date.getDate(),
            j,
            minutes,
          )))) {
            free = false;
          }
        }
      }
    }

    return free;
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

    let output = null;
    if (!this.state.free) {
      style.backgroundColor = '#865cd6';
      textStyle.color = '#FFFFFF';
      output = (
        <div style={style}>
          <h3 style={textStyle}>{this.props.date.getDate()}</h3>
        </div>
      );
    } else {
      style.boxShadow = this.state.boxShadow;
      output = (
        <div
          style={style}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <h3 style={textStyle}>{this.props.date.getDate()}</h3>
        </div>
      );
    }

    return output;
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
};

function mapStateToProps(state) {
  return {
    currentDate: state.date,
    appointments: state.appointments,
  };
}

export default connect(mapStateToProps)(Day);
