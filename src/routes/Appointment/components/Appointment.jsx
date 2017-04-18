import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import { dateToKey } from 'server/appointments.js';
import { toggleEdit } from 'redux/actions.js';
import protectRoute from 'utilities/ProtectRoute.jsx';
import Schedule from 'routes/Calendar/components/Schedule.jsx';
import CalendarLayer from './CalendarLayer.jsx';

class Appointment extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date(
      this.props.date.year,
      this.props.date.month,
      this.props.date.day,
      this.props.date.hour,
      this.props.date.minute,
    );

    this.appointment = this.props.appointments.get(dateToKey(date));
    if (this.appointment !== undefined) {
      this.state = {
        doctor: this.appointment.employee_id,
        patient: this.appointment.patient_id,
      };
    } else {
      this.state = {
        doctor: '',
        patient: '',
      };
    }

    this.setDate = this.setDate.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  setDate() {
    this.props.dispatch(toggleEdit());
    this.props.history.push('/appointment/calendar');
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleCreate() {

  }

  handleEdit() {

  }

  handleDelete() {

  }

  handleCancel() {

  }

  render() {
    const date = new Date(
      this.props.date.year,
      this.props.date.month,
      this.props.date.day,
      this.props.date.hour,
      this.props.date.minute,
    );

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
                value={date}
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
                value={this.state.doctor}
                onChange={this.handleInputChange}
              />
            </FormField>
            <FormField label='Patient'>
              <input
                name='patient'
                type='text'
                value={this.state.patient}
                onChange={this.handleInputChange}
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

        <Route path='/appointment/calendar' component={CalendarLayer} />
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
  dispatch: React.PropTypes.func.isRequired,
  appointments: React.PropTypes.shape({
    has: React.PropTypes.func.isRequired,
    get: React.PropTypes.func.isRequired,
  }).isRequired,
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
  };
}

export default protectRoute(connect(mapStateToProps)(withRouter(Appointment)), required);
