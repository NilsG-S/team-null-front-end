import React from 'react';

class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0)',
    };

    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
  }

  handleMouseLeave() {
    this.setState({
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0)',
    });
  }

  handleMouseEnter() {
    this.setState({
      boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.4)',
    });
  }

  render() {
    const style = {
      flex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      padding: '10px',
    };

    const textStyle = {
      color: '#000001',
    };

    if (this.props.date.getDay() === 0 ||
        this.props.date.getDay() === 6) {
      style.backgroundColor = '#865cd6';
      textStyle.color = '#FFFFFF';
    } else {
      style.boxShadow = this.state.boxShadow;
    }

    return (
      <div
        style={style}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <h3 style={textStyle}>{this.props.date.getDate()}</h3>
      </div>
    );
  }
}

Day.propTypes = {
  date: React.PropTypes.shape({
    getDay: React.PropTypes.func.isRequired,
    getDate: React.PropTypes.func.isRequired,
  }).isRequired,
};

export default Day;
