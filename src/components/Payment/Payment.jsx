import React from 'react';
import { connect } from 'react-redux';

import Layer from 'grommet/components/Layer';
import Heading from 'grommet/components/Heading';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Select from 'grommet/components/Select';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import { PATHS } from 'utilities/paths.js';
import logger from 'logger/logger.js';
import * as server from 'server';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card_number: '',
      method: '',
    };

    switch (this.props.location.pathname) {
      case PATHS.APPOINTMENT_PAYMENT:
        this.options = [
          'Cash',
          'Credit',
          'Debit',
          'Check',
        ];
        break;
      case PATHS.INVOICE_PAYMENT:
        this.options = [
          'Credit',
          'Debit',
        ];
        break;
      default:
        logger.error(`No such path exists (Payment.jsx): ${location}`);
    }

    switch (this.props.payment.type) {
      case 1:
        this.type = 'Copay';
        break;
      case 2:
        this.type = 'Invoice';
        break;
      case 3:
        this.type = 'No-Show';
        break;
      default:
        logger.error(`Invalid payment type: ${this.props.payment.type}`);
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleSelectChange(event) {
    this.setState({
      method: event.option,
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
    const location = this.props.location.pathname;
    const request = {};

    switch (this.state.method) {
      case 'Cash':
        request.method = 1;
        break;
      case 'Credit':
        request.method = 2;
        break;
      case 'Debit':
        request.method = 3;
        break;
      case 'Check':
        request.method = 4;
        break;
      default:
        logger.error(`Invalid payment method: ${this.state.method}`);
    }

    server.modifyPaymentById(this.props.payment.id, request)
      .then(() => {
        logger.info('Payment modified');
        switch (location) {
          case PATHS.APPOINTMENT_PAYMENT:
            this.props.history.push(PATHS.APPOINTMENT);
            break;
          case PATHS.INVOICE_PAYMENT:
            this.props.history.push(PATHS.INVOICE);
            break;
          default:
            logger.error(`No such path exists (Payment.jsx): ${location}`);
        }
      })
      .catch((error) => {
        logger.error(`Error modifying payment: ${error.statusText}`);
      });
  }

  handleClose() {
    const location = this.props.location.pathname;

    switch (location) {
      case PATHS.APPOINTMENT_PAYMENT:
        this.props.history.push(PATHS.APPOINTMENT);
        break;
      case PATHS.INVOICE_PAYMENT:
        this.props.history.push(PATHS.INVOICE);
        break;
      default:
        logger.error(`No such path exists (Payment.jsx): ${location}`);
    }
  }

  render() {
    return (
      <Layer
        closer
        flush={false}
        align='center'
        onClose={this.handleClose}
      >
        <Form
          pad='medium'
          plain={false}
          onSubmit={this.handleSubmit}
        >
          <Heading tag='h2'>
            Payment
          </Heading>
          <fieldset>
            <FormField label='Type'>
              <input
                name='type'
                type='text'
                value={this.type}
                disabled
              />
            </FormField>
            <FormField label='Amount'>
              <input
                name='amount'
                type='text'
                value={`$${this.props.payment.amount}`}
                disabled
              />
            </FormField>
            <FormField label='Method'>
              <Select
                name='method'
                options={this.options}
                value={this.state.method}
                onChange={this.handleSelectChange}
              />
            </FormField>
            <FormField label='Card Number'>
              <input
                name='card_number'
                type='text'
                value={this.state.card_number}
                onChange={this.handleChange}
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
              label={'Submit'}
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

Payment.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  payment: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    amount: React.PropTypes.number.isRequired,
    type: React.PropTypes.number.isRequired,
  }).isRequired,
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    payment: state.payment,
  };
}

export default connect(mapStateToProps)(Payment);
