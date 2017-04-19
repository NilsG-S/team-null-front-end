import React from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import Heading from 'grommet/components/Heading';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import * as server from 'server';
import protectRoute from 'utilities/ProtectRoute.jsx';

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
    this.record = server.getRecordById(this.appointment.id);
    this.state = {
      weight: this.record.weight,
      height: this.record.height,
      blood_pressure: this.record.weight,
      visit_reason: this.record.visit_reason,
      treatment_content: this.record.treatment_content,
      prescription: this.record.prescription,
    };

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleStringChange = this.handleStringChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNumberChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const final = parseInt(value, 10);

    this.setState({
      [name]: final,
    });
  }

  handleStringChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {

  }

  render() {
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
                onChange={this.handleNumberChange}
              />
            </FormField>
            <FormField label='Height'>
              <input
                name='height'
                type='text'
                value={this.state.height}
                onChange={this.handleNumberChange}
              />
            </FormField>
            <FormField label='Blood Pressure'>
              <input
                name='blood_pressure'
                type='text'
                value={this.state.blood_pressure}
                onChange={this.handleNumberChange}
              />
            </FormField>
            <FormField label='Visit Reason'>
              <textarea
                name='visit_reason'
                value={this.state.visit_reason}
                onChange={this.handleStringChange}
              />
            </FormField>
            <FormField label='Treatment Content'>
              <textarea
                name='treatment_content'
                value={this.state.treatment_content}
                onChange={this.handleStringChange}
              />
            </FormField>
            <FormField label='Prescription'>
              <textarea
                name='prescription'
                value={this.state.prescription}
                onChange={this.handleStringChange}
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
  };
}

export default protectRoute(connect(mapStateToProps)(Record), required);
