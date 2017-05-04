import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

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
    this.handleCancel = this.handleCancel.bind(this);
  }

  setDate() {
    this.props.history.push('/appointment/calendar');
  }

  handleCreate() {
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

  handleEdit() {

  }

  handleDelete() {

  }

  handleCancel() {
    this.props.history.push('/patients');
  }

  render() {
    let passSubmit = this.handleCreate;
    let passCancel = this.handleCancel;
    let submitLabel = 'Submit';
    let cancelLabel = 'Cancel';
    if (this.appointment !== undefined) {
      passSubmit = this.handleEdit;
      passCancel = this.handleDelete;
      submitLabel = 'Modify';
      cancelLabel = 'Delete';
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
            <Button
              label={cancelLabel}
              type='button'
              primary={false}
              onClick={passCancel}
            />
          </Footer>
        </Form>

        <Route path='/appointment/calendar' component={AppCalendar} />
        <Route path='/appointment/schedule' component={Schedule} />
      </Box>
    );
  }
}

Appointment.propTypes = {
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
