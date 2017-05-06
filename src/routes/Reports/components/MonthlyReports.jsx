import React from 'react';

import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import * as server from 'server';

export default class MonthlyReports extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      monthly: new Map(),
      list: [],
    };
  }

  componentWillMount() {
    server.getAllMonthlyReports().then((response) => {
      const monthly = new Map();
      const list = [];
      let key;

      response.forEach((element) => {
        key = `Doctor:${element.doctor_name} Patient Count:${element.patient_count} Total Income:${element.total_income}`;
        list.push(key);
        monthly.set(key, element);
      });

      this.setState({
        monthly,
        list,
      });
    });
  }
  render() {
    return (
      <div>
        <List>
          {this.state.list.map(function(key) {
            return <ListItem>{key}</ListItem>
          })
        }
        </List>
      </div>
    );
  }
}
