import React from 'react';
import { connect } from 'react-redux';

import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Title from 'grommet/components/Title';
import Select from 'grommet/components/Select';

import { incMonth, decMonth, toggleEdit } from 'redux/actions.js';
import { getAllDoctors, getUncompAppsByDoctor } from 'server';
import Month from 'components/Month/Month.jsx';

class AppCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    this.state = {
      doctors: new Map(),
      options: [],
      select: 'Select',
    };

    this.backHandler = this.backHandler.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this);
  }

  componentWillMount() {
    getAllDoctors().then((response) => {
      const doctors = new Map();
      const options = [];
      let key;

      response.forEach((element) => {
        key = `${element.last_name}, ${element.first_name} (${element.id})`;
        options.push(key);
        doctors.set(key, element);
      });

      this.setState({
        doctors,
        options,
      });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.select !== this.state.select && this.state.select !== 0) {
      const id = this.state.doctors.get(this.state.select).id;
      getUncompAppsByDoctor(id, this.props.date.month);
    }
  }

  onSelectChange(event) {
    this.setState({
      select: event.option,
    });
  }

  nextHandler() {
    this.props.dispatch(incMonth());
  }

  handleClose() {
    this.props.dispatch(toggleEdit());
    this.props.history.push('/appointment');
  }

  backHandler() {
    this.props.dispatch(decMonth());
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
            <Button
              icon={<CaretNext />}
              onClick={this.nextHandler}
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
            <Select
              options={this.state.options}
              value={this.state.select}
              onChange={this.onSelectChange}
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

AppCalendar.propTypes = {
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

export default connect(mapStateToProps)(AppCalendar);
