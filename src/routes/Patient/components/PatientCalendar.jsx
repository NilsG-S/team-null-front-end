import React from 'react';
import { connect } from 'react-redux';

import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Title from 'grommet/components/Title';

import { setDate, incMonth, decMonth } from 'redux/actions.js';
import { getUncompAppsByPatient } from 'server';
import Month from 'components/Month/Month.jsx';

class PatientCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

    this.handleClose = this.handleClose.bind(this);
    this.backHandler = this.backHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  componentWillMount() {
    const date = new Date();
    if (this.props.date.month === 0) {
      this.props.dispatch(setDate({
        year: date.getFullYear(),
        month: date.getMonth(),
      }));
    } else {
      getUncompAppsByPatient(this.props.patientId, this.props.date.month);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.date.month !== this.props.date.month) {
      getUncompAppsByPatient(this.props.patientId, this.props.date.month);
    }
  }

  handleClose() {
    this.props.history.push('/patient');
  }

  backHandler() {
    this.props.dispatch(decMonth());
  }

  nextHandler() {
    this.props.dispatch(incMonth());
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
        </Box>
      </Layer>
    );
  }
}

PatientCalendar.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  date: React.PropTypes.shape({
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
  }).isRequired,
  patientId: React.PropTypes.number.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    date: state.date,
    patientId: state.patientId,
  };
}

export default connect(mapStateToProps)(PatientCalendar);
