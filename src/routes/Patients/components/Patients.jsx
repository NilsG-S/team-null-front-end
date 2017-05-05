import React from 'react';
import { connect } from 'react-redux';

import Box from 'grommet/components/Box';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import { setPatientId } from 'redux/actions.js';
import * as server from 'server';
import protectRoute from 'utilities/ProtectRoute.jsx';

class Patients extends React.Component {
  constructor(props) {
    super(props);

    this.makeItem = this.makeItem.bind(this);
  }

  componentWillMount() {
    server.getAllPatients();
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
        <List>
          {Array.from(this.props.patients).map(this.makeItem)}
        </List>
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
