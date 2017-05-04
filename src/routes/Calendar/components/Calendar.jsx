import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Title from 'grommet/components/Title';

import { setDate, incMonth, decMonth, AuthStates } from 'redux/actions.js';
import protectRoute from 'utilities/ProtectRoute.jsx';
import { getUncompAppsByDoctor } from 'server';
import Month from 'components/Month/Month.jsx';
import Schedule from 'components/Schedule/Schedule.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

    this.backHandler = this.backHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  componentWillMount() {
    const date = new Date();
    this.props.dispatch(setDate({
      year: date.getFullYear(),
      month: date.getMonth(),
    }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date.month !== this.props.date.month) {
      this.getAppointments();
    }
  }

  getAppointments() {
    let id;

    if (this.props.user.type === AuthStates.DOCTOR) {
      id = this.props.user.id;
    } else {
      id = this.props.user.associated_id;
    }

    getUncompAppsByDoctor(id, this.props.date.month);
  }

  backHandler() {
    this.props.dispatch(decMonth());
  }

  nextHandler() {
    this.props.dispatch(incMonth());
  }

  render() {
    return (
      <Box full>
        <Header
          size='small'
          flex
          direction='row'
          responsive={false}
          alignContent='between'
        >
          <Button
            icon={<CaretBack />}
            onClick={this.backHandler}
          />
          <Box
            flex
            direction='row'
            responsive={false}
            justify='center'
          >
            <Title>
              {this.monthFormatter.format(new Date(
                this.props.date.year,
                this.props.date.month,
              ))} {this.props.date.year}
            </Title>
          </Box>
          <Button
            icon={<CaretNext />}
            onClick={this.nextHandler}
          />
        </Header>
        <Box
          id='routes-calendar-components-calendar-box-1'
          flex
          align='center'
        >
          <Month />
        </Box>

        <Route path='/calendar/schedule' component={Schedule} />
      </Box>
    );
  }
}

Calendar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  date: React.PropTypes.shape({
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
  }).isRequired,
  user: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    type: React.PropTypes.number.isRequired,
    associated_id: React.PropTypes.number.isRequired,
  }).isRequired,
};

const required = {
  0: false,
  1: true,
  2: true,
  3: false,
  4: false,
};

function mapStateToProps(state) {
  return {
    date: state.date,
    user: state.user,
  };
}

export default protectRoute(connect(mapStateToProps)(Calendar), required);
