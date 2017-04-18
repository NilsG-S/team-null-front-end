import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Title from 'grommet/components/Title';

import { incMonth, decMonth, toggleEdit } from 'redux/actions.js';
import Month from 'routes/Calendar/components/Month.jsx';

class CalendarLayer extends React.Component {
  constructor(props) {
    super(props);
    this.monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

    this.backHandler = this.backHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  backHandler() {
    this.props.dispatch(decMonth());
  }

  handleClose() {
    this.props.dispatch(toggleEdit());
    this.props.history.push('/appointment');
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

CalendarLayer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  date: React.PropTypes.shape({
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
  }).isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    date: state.date,
  };
}

export default connect(mapStateToProps)(withRouter(CalendarLayer));
