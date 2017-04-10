import React from 'react';

import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Button from 'grommet/components/Button';
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Title from 'grommet/components/Title';

import protectRoute from 'utilities/ProtectRoute.jsx';
import Month from './Month.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.date = new Date();
    this.monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long' });

    this.state = {
      month: this.monthFormatter.format(this.date),
      year: this.date.getFullYear(),
    };

    this.backHandler = this.backHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  backHandler() {
    let current = this.date.getMonth();
    current -= 1;
    this.date.setMonth(current);

    this.setState({
      month: this.monthFormatter.format(this.date),
      year: this.date.getFullYear(),
    });
  }

  nextHandler() {
    let current = this.date.getMonth();
    current += 1;
    this.date.setMonth(current);

    this.setState({
      month: this.monthFormatter.format(this.date),
      year: this.date.getFullYear(),
    });
  }

  render() {
    return (
      <Box full>
        <Header
          size='small'
          flex
          direction='row'
          responsive={false}
          alignContent='between'
        >
          <Button
            icon={<CaretBack />}
            onClick={this.backHandler}
          />
          <Box
            flex
            direction='row'
            responsive={false}
            justify='center'
          >
            <Title>
              {this.state.month} {this.state.year}
            </Title>
          </Box>
          <Button
            icon={<CaretNext />}
            onClick={this.nextHandler}
          />
        </Header>
        <Box
          id='routes-calendar-components-calendar-box-1'
          flex
          align='center'
          justify='center'
        >
          <Month date={this.date} />
        </Box>
      </Box>
    );
  }
}

const required = {
  0: false,
  1: true,
  2: true,
  3: true,
  4: false,
};

export default protectRoute(Calendar, required);
