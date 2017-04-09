import React from 'react';

import Box from 'grommet/components/Box';

import protectRoute from 'utilities/ProtectRoute.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 500
    };

    this.resizeCalendar = this.resizeCalendar.bind(this);
  }

  resizeCalendar() {
    const element = document.getElementById(
      'routes-calendar-components-calendar-div-1'
    );
    const newHeight = element.parentElement.clientHeight;
    const newWidth = element.parentElement.clientWidth;
    let newSize;

    if (newWidth > newHeight) {
      newSize = newHeight;
    } else {
      newSize = newWidth;
    }

    this.setState({
      size: newSize
    });
  }

  componentDidMount() {
    this.resizeCalendar();
    window.addEventListener('resize', this.resizeCalendar);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCalendar);
  }

  render() {
    let main = {
      height: '100%',
      width: '100%',
    };

    let style = {
      height: this.state.size,
      width: this.state.size,
      display: 'flex',
      flexDirection: 'column',
    };

    let style2 = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    };

    return (
      <Box flex align='center' justify='center'>
        <div id='routes-calendar-components-calendar-div-1' style={style}>
          <div style={style2}>
            <h2>Calendar</h2>
          </div>
          <div style={style2}>
            <h2>Calendar</h2>
          </div>
        </div>
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
