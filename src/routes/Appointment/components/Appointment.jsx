import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import { setDate, setDoctorId } from 'redux/actions.js';
import logger from 'logger/logger.js';
import * as server from 'server';
import protectRoute from 'utilities/ProtectRoute.jsx';
import Schedule from 'components/Schedule/Schedule.jsx';
import AppCalendar from './AppCalendar.jsx';

class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.monthFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
    this.appointment = this.props.appointments.get(server.dateToKey(new Date(
      this.props.date.year,
      this.props.date.month,
      this.props.date.day,
      this.props.date.hour,
      this.props.date.minute,
    )));

    this.setDate = this.setDate.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentWillMount() {
    if (this.appointment === undefined) {
      const date = new Date();
      this.props.dispatch(setDate({
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: 8,
        minute: 0,
      }));
      this.props.dispatch(setDoctorId(0));
    } else {
      this.props.dispatch(setDoctorId(this.appointment.employee_id));
    }
  }

  setDate() {
    this.props.history.push('/appointment/calendar');
  }

  handleCreate(event) {
    event.preventDefault();

    server.createApp({
      employee_id: this.props.doctorId,
      patient_id: this.props.patientId,
      date_time: new Date(
        this.props.date.year,
        this.props.date.month,
        this.props.date.day,
        this.props.date.hour,
        this.props.date.minute,
      ),
    })
      .then(() => {
        logger.info('Appointment created');
        this.props.history.push('/patients');
      })
      .catch((error) => {
        logger.error(`Error creating appointment: ${error.statusText}`);
      });
  }

  handleEdit(event) {
    event.preventDefault();

    server.modifyApp(this.appointment.id, {
      employee_id: this.props.doctorId,
      patient_id: this.props.patientId,
      date_time: new Date(
        this.props.date.year,
        this.props.date.month,
        this.props.date.day,
        this.props.date.hour,
        this.props.date.minute,
      ),
      complete: 0,
    })
      .then((app) => {
        logger.info(`Appointment ${app.id} was modified`);
        this.props.history.push('/patients');
      })
      .catch((error) => {
        logger.error(`Error modifying appointment: ${error.statusText}`);
      });
  }

  handleDelete() {
    server.deleteApp(this.appointment.id)
      .then(() => {
        logger.info(`Appointment ${this.appointment.id} was deleted`);
        this.props.history.push('/patients');
      })
      .catch((error) => {
        logger.error(`Error deleting appointment: ${error.statusText}`);
      });
  }

  render() {
    let passSubmit = this.handleCreate;
    let submitLabel = 'Create';
    let deleteButton = null;

    if (this.appointment !== undefined) {
      passSubmit = this.handleEdit;
      submitLabel = 'Modify';
      deleteButton = (
        <Button
          label={'Delete'}
          type='button'
          primary={false}
          onClick={this.handleDelete}
        />
      );
    }

    return (
      <Box
        flex
        align='center'
        size={{ width: 'full' }}
      >
        <Heading tag='h2'>
          Appointment
        </Heading>
        <Form
          pad='medium'
          plain={false}
          onSubmit={passSubmit}
        >
          <fieldset>
            <FormField label='Date'>
              <input
                name='date'
                type='text'
                value={this.monthFormatter.format(new Date(
                  this.props.date.year,
                  this.props.date.month,
                  this.props.date.day,
                  this.props.date.hour,
                  this.props.date.minute,
                ))}
                disabled
              />
            </FormField>
            <Box
              flex
              direction='row'
              justify='center'
              responsive={false}
            >
              <Button
                label='Date'
                type='button'
                primary={false}
                onClick={this.setDate}
              />
            </Box>
            <FormField label='Doctor'>
              <input
                name='doctor'
                type='text'
                value={this.props.doctorId}
                disabled
              />
            </FormField>
            <FormField label='Patient'>
              <input
                name='patient'
                type='text'
                value={this.props.patientId}
                disabled
              />
            </FormField>
          </fieldset>
          <Footer
            size='small'
            direction='row'
            justify='center'
            pad={{ between: 'small' }}
            responsive={false}
          >
            <Button
              label={submitLabel}
              type='submit'
              primary
              onClick={passSubmit}
            />
            {deleteButton}
          </Footer>
        </Form>

        <Route path='/appointment/calendar' component={AppCalendar} />
        <Route path='/appointment/schedule' component={Schedule} />
      </Box>
    );
  }
}

Appointment.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  date: React.PropTypes.shape({
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
    day: React.PropTypes.number.isRequired,
    hour: React.PropTypes.number.isRequired,
    minute: React.PropTypes.number.isRequired,
  }).isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  appointments: React.PropTypes.shape({
    has: React.PropTypes.func.isRequired,
    get: React.PropTypes.func.isRequired,
  }).isRequired,
  doctorId: React.PropTypes.number.isRequired,
  patientId: React.PropTypes.number.isRequired,
};

const required = {
  0: false,
  1: false,
  2: false,
  3: true,
  4: false,
};

function mapStateToProps(state) {
  return {
    date: state.date,
    appointments: state.appointments,
    doctorId: state.doctorId,
    patientId: state.patientId,
  };
}

export default protectRoute(connect(mapStateToProps)(Appointment), required);
