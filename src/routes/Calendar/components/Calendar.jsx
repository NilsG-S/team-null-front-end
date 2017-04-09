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
          <Button icon={<CaretBack />} />
          <Box
            flex
            direction='row'
            responsive={false}
            justify='center'
          >
            <Title>
              Month
            </Title>
          </Box>
          <Button icon={<CaretNext />} />
        </Header>
        <Box
          id='routes-calendar-components-calendar-box-1'
          flex
          align='center'
          justify='center'
        >
          <Month />
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
