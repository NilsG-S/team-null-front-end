import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import protectRoute from 'utilities/ProtectRoute.jsx';
import Schedule from 'components/Schedule/Schedule.jsx';
import PatientCalendar from './PatientCalendar.jsx';

class Patient extends React.Component {
  constructor(props) {
    super(props);
    this.patient = this.props.patients.get(this.props.patientId);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleCreate() {
    this.props.history.push('/appointment');
  }

  handleEdit() {
    this.props.history.push('/patient/calendar');
  }

  render() {
    return (
      <Box
        flex
        align='center'
        size={{ width: 'full' }}
      >
        <Form
          pad='medium'
          plain={false}
        >
          <Heading tag='h2'>
            Patient
          </Heading>
          <fieldset>
            <FormField label='Last Name'>
              <input
                name='last_name'
                type='text'
                value={this.patient.last_name}
                disabled
              />
            </FormField>
            <FormField label='First Name'>
              <input
                name='first_name'
                type='text'
                value={this.patient.first_name}
                disabled
              />
            </FormField>
            <FormField label='Address'>
              <input
                name='address'
                type='text'
                value={this.patient.address}
                disabled
              />
            </FormField>
            <FormField label='Phone Number'>
              <input
                name='phone_number'
                type='text'
                value={this.patient.phone_number}
                disabled
              />
            </FormField>
            <FormField label='Email'>
              <input
                name='email'
                type='text'
                value={this.patient.email}
                disabled
              />
            </FormField>
            <FormField label='SSN'>
              <input
                name='ssn'
                type='text'
                value={this.patient.ssn}
                disabled
              />
            </FormField>
            <FormField label='Insurance Provider'>
              <input
                name='insurance_provider'
                type='text'
                value={this.patient.insurance_provider}
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
              label='Create'
              type='button'
              primary
              onClick={this.handleCreate}
            />
            <Button
              label='Edit'
              type='button'
              primary={false}
              onClick={this.handleEdit}
            />
          </Footer>
        </Form>

        <Route path='/patient/calendar' component={PatientCalendar} />
        <Route path='/patient/schedule' component={Schedule} />
      </Box>
    );
  }
}

Patient.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  patients: React.PropTypes.shape({
    get: React.PropTypes.func.isRequired,
  }).isRequired,
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
    patients: state.patients,
    patientId: state.patientId,
  };
}

export default protectRoute(connect(mapStateToProps)(Patient), required);
