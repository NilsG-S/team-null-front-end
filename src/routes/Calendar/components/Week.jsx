import React from 'react';

import Day from './Day.jsx';

class Week extends React.Component {
  render() {
    const style = {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    };

    return (
      <div style={style}>
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
        <Day />
      </div>
    );
  }
}

export default Week;
