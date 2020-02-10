import React, { Component } from 'react';
import PropTypes from 'prop-types';

const style = {
  content: {
    fontSize: '35px',
    textAlign: 'center',
    margin: '40px 0'
  }
};

class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.text
    };
  }

  componentDidMount() {
    const { text, speed } = this.props;
    this.interval = window.setInterval(() => {
      if (this.state.content === 'Loading' + '...') {
        this.setState({ content: 'Loading' });
      } else {
        this.setState(({ content }) => ({ content: content + '.' }));
      }
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return <h2 style={style.content}>{this.state.content}</h2>;
  }
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number
};

Loading.defaultProps = {
  text: 'Loading',
  speed: 200
};

export default Loading;
