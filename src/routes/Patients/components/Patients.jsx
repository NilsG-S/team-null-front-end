import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { setPatientId } from 'redux/actions.js';
import * as server from 'server';
import protectRoute from 'utilities/ProtectRoute.jsx';
import CreatePatient from './CreatePatient.jsx';

class Patients extends React.Component {
  constructor(props) {
    super(props);

    this.makeItem = this.makeItem.bind(this);
    this.handleNew = this.handleNew.bind(this);
  }

  componentWillMount() {
    server.getAllPatients();
  }

  handleNew() {
    this.props.history.push('/patients/create');
  }

  handleClick(value) {
    this.props.dispatch(setPatientId(value.id));
    this.props.history.push('/patient');
  }

  makeItem(element, index) {
    const value = element[1];
    const click = this.handleClick.bind(this, value);

    return (
      <ListItem
        key={index}
        onClick={click}
        responsive={false}
        justify='between'
        direction='row'
      >
        <span>
          {`${value.last_name}, ${value.first_name}`}
        </span>
        <span>
          {`${value.id}`}
        </span>
      </ListItem>
    );
  }

  render() {
    return (
      <Box full>
        <Header
          size='small'
          flex
          direction='row'
          responsive={false}
          justify='between'
          pad={{ horizontal: 'small' }}
        >
          <Title>
            Patients
          </Title>
          <Button
            label='New Patient'
            type='button'
            primary
            onClick={this.handleNew}
          />
        </Header>
        <List>
          {Array.from(this.props.patients).map(this.makeItem)}
        </List>

        <Route path='/patients/create' component={CreatePatient} />
      </Box>
    );
  }
}

Patients.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  history: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired,
  }).isRequired,
  patients: React.PropTypes.shape({
    forEach: React.PropTypes.func.isRequired,
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
    patients: state.patients,
    patientId: state.patientId,
  };
}

export default protectRoute(connect(mapStateToProps)(Patients), required);
