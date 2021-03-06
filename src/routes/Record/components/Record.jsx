import React from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import { AuthStates } from 'redux/actions.js';
import * as server from 'server';
import protectRoute from 'utilities/ProtectRoute.jsx';
import logger from 'logger/logger.js';

class Record extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date(
      this.props.date.year,
      this.props.date.month,
      this.props.date.day,
      this.props.date.hour,
      this.props.date.minute,
    );

    this.appointment = this.props.appointments.get(server.dateToKey(date));
    this.record = null;
    this.state = {
      weight: '',
      height: '',
      blood_pressure: '',
      reason: '',
      treatment_content: '',
      prescription: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    server.getRecordById(this.appointment.id).then((record) => {
      this.record = record;

      Object.keys(this.record).forEach((key) => {
        if (this.record[key] === null) {
          this.record[key] = '';
        }
      });

      this.setState({
        weight: this.record.weight,
        height: this.record.height,
        blood_pressure: this.record.blood_pressure,
        reason: this.record.reason,
        treatment_content: this.record.treatment_content,
        prescription: this.record.prescription,
      });
    });
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
    let request;

    if (this.props.type === AuthStates.DOCTOR) {
      request = Object.assign({}, this.appointment);
      request.completed = 1;
      delete request.id;

      server.modifyApp(this.appointment.id, request)
        .then((response) => {
          logger.info('Appointment is now complete');
          this.appointment = response;
        });
    }

    request = {
      weight: parseInt(this.state.weight, 10),
      height: parseInt(this.state.height, 10),
      blood_pressure: parseInt(this.state.blood_pressure, 10),
      reason: this.state.reason,
      treatment_content: this.state.treatment_content,
      prescription: this.state.prescription,
    };

    server.modifyRecord(this.record.appointment_id, request)
      .then((response) => {
        logger.info('Record was modified');
        this.record = response;
      });
  }

  render() {
    let treatmentContent = (
      <FormField label='Treatment Content'>
        <textarea
          name='treatment_content'
          value={this.state.treatment_content}
          onChange={this.handleChange}
          maxLength='50'
        />
      </FormField>
    );
    let prescription = (
      <FormField label='Prescription'>
        <textarea
          name='prescription'
          value={this.state.prescription}
          onChange={this.handleChange}
          maxLength='50'
        />
      </FormField>
    );

    if (this.props.type === AuthStates.NURSE) {
      treatmentContent = null;
      prescription = null;
    }

    return (
      <Box
        flex
        align='center'
        size={{ width: 'full' }}
      >
        <Heading tag='h2'>
          Patient Record
        </Heading>
        <Form
          pad='medium'
          plain={false}
          onSubmit={this.handleSubmit}
        >
          <fieldset>
            <FormField label='Weight'>
              <input
                name='weight'
                type='text'
                value={this.state.weight}
                onChange={this.handleChange}
              />
            </FormField>
            <FormField label='Height'>
              <input
                name='height'
                type='text'
                value={this.state.height}
                onChange={this.handleChange}
              />
            </FormField>
            <FormField label='Blood Pressure'>
              <input
                name='blood_pressure'
                type='text'
                value={this.state.blood_pressure}
                onChange={this.handleChange}
              />
            </FormField>
            <FormField label='Visit Reason'>
              <textarea
                name='reason'
                value={this.state.reason}
                onChange={this.handleChange}
                maxLength='50'
              />
            </FormField>
            {treatmentContent}
            {prescription}
          </fieldset>
          <Footer
            size='small'
            direction='row'
            justify='center'
            pad={{ between: 'small' }}
            responsive={false}
          >
            <Button
              label='Submit'
              type='submit'
              primary
              onClick={this.handleSubmit}
            />
          </Footer>
        </Form>
      </Box>
    );
  }
}

Record.propTypes = {
  date: React.PropTypes.shape({
    year: React.PropTypes.number.isRequired,
    month: React.PropTypes.number.isRequired,
    day: React.PropTypes.number.isRequired,
    hour: React.PropTypes.number.isRequired,
    minute: React.PropTypes.number.isRequired,
  }).isRequired,
  appointments: React.PropTypes.shape({
    get: React.PropTypes.func.isRequired,
  }).isRequired,
  type: React.PropTypes.number.isRequired,
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
    appointments: state.appointments,
    type: state.user.type,
  };
}

export default protectRoute(connect(mapStateToProps)(Record), required);
