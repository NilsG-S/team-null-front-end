import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import Footer from 'grommet/components/Footer';
import Button from 'grommet/components/Button';

import * as server from 'server';
import logger from 'logger/logger.js';
import { AuthStates } from 'redux/actions.js';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      password: '',
      err: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const id = parseInt(this.state.id, 10);

    server.login(id, this.state.password)
      .then((user) => {
        logger.info(`User ${user.id} was logged in`);
      })
      .catch((error) => {
        const message = `Couldn't login: ${error.status}`;
        logger.error(message);
        this.setState({
          err: message,
        });
      });
  }

  handlePayment() {
    this.props.history.push('/invoice');
  }

  render() {
    let output = null;
    let errMessage = null;

    if (this.state.err !== '') {
      errMessage = (
        <span style={{ color: 'red' }}>{this.state.err}</span>
      );
    }

    switch (this.props.user.type) {
      case AuthStates.GUEST:
        output = (
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
                <FormField label='ID'>
                  <input
                    name='id'
                    type='text'
                    value={this.state.id}
                    onChange={this.handleInputChange}
                  />
                </FormField>
                <FormField label='Password'>
                  <input
                    name='password'
                    type='password'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </FormField>
                {errMessage}
              </fieldset>
              <Footer
                size='small'
                direction='row'
                justify='center'
                pad={{ between: 'small' }}
                responsive={false}
              >
                <Button
                  label='Login'
                  type='submit'
                  primary
                  onClick={this.handleSubmit}
                />
                <Button
                  label='Payment'
                  type='button'
                  primary={false}
                  onClick={this.handlePayment}
                />
              </Footer>
            </Form>
          </Box>
        );

        break;
      case AuthStates.CEO:
        output = (
          <Redirect to='/reports' />
        );

        break;
      case AuthStates.STAFF:
        output = (
          <Redirect to='/patients' />
        );

        break;
      default:
        output = (
          <Redirect to='/calendar' />
        );
    }

    return output;
  }
}

Auth.propTypes = {
  user: React.PropTypes.shape({
    type: React.PropTypes.number.isRequired,
  }).isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
};

function getUser(user) {
  return user;
}

function mapStateToProps(state) {
  return {
    user: getUser(state.user),
  };
}

export default connect(mapStateToProps)(Auth);
