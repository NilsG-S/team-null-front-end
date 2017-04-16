import React from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Title from 'grommet/components/Title';

import { setDate } from 'redux/actions.js';
import protectRoute from 'utilities/ProtectRoute.jsx';
import Month from './Month.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    this.date = null;

    if (this.props.edit) {
      this.date = new Date(this.props.date.year, this.props.date.month);
    } else {
      this.date = new Date();
      this.props.dispatch(setDate({
        year: this.date.getFullYear(),
        month: this.date.getMonth(),
      }));
    }

    this.backHandler = this.backHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  backHandler() {
    let current = this.date.getMonth();
    current -= 1;
    this.date.setMonth(current);

    this.props.dispatch(setDate({
      year: this.date.getFullYear(),
      month: this.date.getMonth(),
    }));
  }

  nextHandler() {
    let current = this.date.getMonth();
    current += 1;
    this.date.setMonth(current);

    this.props.dispatch(setDate({
      year: this.date.getFullYear(),
      month: this.date.getMonth(),
    }));
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
              {this.monthFormatter.format(this.date)} {this.props.date.year}
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
          justify='center'
        >
          <Month date={this.date} />
        </Box>
      </Box>
    );
  }
}

Calendar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  edit: React.PropTypes.bool.isRequired,
  date: React.PropTypes.shape({
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
  }).isRequired,
};

const required = {
  0: false,
  1: true,
  2: true,
  3: true,
  4: false,
};

function mapStateToProps(state) {
  return {
    edit: state.edit,
    date: state.date,
  };
}

export default protectRoute(connect(mapStateToProps)(Calendar), required);
