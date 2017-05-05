import React from 'react';

import Weekday from 'components/Day/Weekday.jsx';

class Weekdays extends React.Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    };

    return (
      <div style={style}>
        <Weekday name='Su' />
        <Weekday name='Mo' />
        <Weekday name='Tu' />
        <Weekday name='We' />
        <Weekday name='Th' />
        <Weekday name='Fr' />
        <Weekday name='Sa' />
      </div>
    );
  }
}

export default Weekdays;
