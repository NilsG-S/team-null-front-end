import React from 'react';

import Week from './Week.jsx';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 500,
    };

    this.resizeCalendar = this.resizeCalendar.bind(this);
  }

  componentDidMount() {
    this.resizeCalendar();
    window.addEventListener('resize', this.resizeCalendar);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeCalendar);
  }

  resizeCalendar() {
    const element = document
      .getElementById('routes-calendar-components-calendar-box-1');
    const newHeight = element.clientHeight;
    const newWidth = element.clientWidth;
    let newSize;

    if (newWidth > newHeight) {
      newSize = newHeight;
    } else {
      newSize = newWidth;
    }

    this.setState({
      size: newSize,
    });
  }

  render() {
    const style = {
      height: this.state.size,
      width: this.state.size,
      display: 'flex',
      flexDirection: 'column',
    };

    return (
      <div style={style}>
        <Week />
        <Week />
        <Week />
        <Week />
        <Week />
        <Week />
      </div>
    );
  }
}

export default Month;
