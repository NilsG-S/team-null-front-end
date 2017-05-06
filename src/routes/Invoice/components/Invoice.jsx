import React from 'react';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import logger from 'logger/logger.js';
import * as server from 'server';

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      id: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = parseInt(this.state.id, 10);

    server.getPaymentById(id)
      .then(() => {
        logger.info('Payment retrieved');
        this.props.history.push('/invoice/payment');
      })
      .catch((error) => {
        logger.error(`Error getting payment: ${error.statusText}`);
      });
  }

  render() {
    return (
      <Box
        flex
        align='center'
        justify='center'
      >
        <Form
          pad='medium'
          plain={false}
          onSubmit={this.handleSubmit}
        >
          <fieldset>
            <FormField label='Payment ID'>
              <input
                name='id'
                type='text'
                value={this.state.id}
                onChange={this.handleChange}
              />
            </FormField>
          </fieldset>
          <Footer size='small'>
            <Button
              label='Get Payment'
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

Invoice.propTypes = {
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default Invoice;
