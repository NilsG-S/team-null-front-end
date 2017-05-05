import React from 'react';

import Layer from 'grommet/components/Layer';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import logger from 'logger/logger.js';
import * as server from 'server';

class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      last_name: '',
      first_name: '',
      address: '',
      phone_number: '',
      email: '',
      ssn: '',
      insurance_provider: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    server.createPatient({
      last_name: this.state.last_name,
      first_name: this.state.first_name,
      address: this.state.address,
      phone_number: this.state.phone_number,
      email: this.state.email,
      ssn: this.state.ssn,
      insurance_provider: this.state.insurance_provider,
    })
      .then(() => {
        logger.info('Patient created');
        this.props.history.push('/patients');
      })
      .catch((error) => {
        logger.error(`Error creating patient: ${error.statusText}`);
      });
  }

  handleClose() {
    this.props.history.push('/patients');
  }

  render() {
    return (
      <Layer
        closer
        flush={false}
        onClose={this.handleClose}
      >
        <Form
          pad='medium'
          plain={false}
          onSubmit={this.handleSubmit}
        >
          <Heading tag='h2'>
            Create Patient
          </Heading>
          <fieldset>
            <FormField label='Last Name'>
              <input
                name='last_name'
                type='text'
                value={this.state.last_name}
                onChange={this.handleChange}
                maxLength='30'
              />
            </FormField>
            <FormField label='First Name'>
              <input
                name='first_name'
                type='text'
                value={this.state.first_name}
                onChange={this.handleChange}
                maxLength='30'
              />
            </FormField>
            <FormField label='Address'>
              <input
                name='address'
                type='text'
                value={this.state.address}
                onChange={this.handleChange}
                maxLength='75'
              />
            </FormField>
            <FormField label='Phone Number'>
              <input
                name='phone_number'
                type='text'
                value={this.state.phone_number}
                onChange={this.handleChange}
                maxLength='12'
              />
            </FormField>
            <FormField label='Email'>
              <input
                name='email'
                type='text'
                value={this.state.email}
                onChange={this.handleChange}
                maxLength='50'
              />
            </FormField>
            <FormField label='SSN'>
              <input
                name='ssn'
                type='text'
                value={this.state.ssn}
                onChange={this.handleChange}
                maxLength='11'
              />
            </FormField>
            <FormField label='Insurance Provider'>
              <input
                name='insurance_provider'
                type='text'
                value={this.state.insurance_provider}
                onChange={this.handleChange}
                maxLength='50'
              />
            </FormField>
          </fieldset>
          <Footer
            size='small'
            direction='row'
            justify='center'
            responsive={false}
          >
            <Button
              label='Create'
              type='submit'
              primary
              onClick={this.handleSubmit}
            />
          </Footer>
        </Form>
      </Layer>
    );
  }
}

Appointment.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default Appointment;
