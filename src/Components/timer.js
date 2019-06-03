import React, { Component } from 'react';
import { Link } from 'react-router';
import './Authorization.css';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = { currentCount: 15 }
  }
  timer() {
    this.setState({
      currentCount: this.state.currentCount - 1
    })
    if (this.state.currentCount < 1) {
      clearInterval(this.intervalId);
    }
    this.props.get_sec(this.state.currentCount)
  }
  set_cecs = () => {
    this.setState({
      currentCount: 15
    })
    this.props.get_pasword();
    this.intervalId = setInterval(this.timer.bind(this), 1000);
  }
  not_sec = () => {
    return false
  }
  componentDidMount() {
    this.intervalId = setInterval(this.timer.bind(this), 1000);

  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  componentDidUpdate() {

  }
  render() {
    return (
      <span id='timer_sms'><Link to={this.state.currentCount < 1 ? '/authorization' : ''} color='#00cc00'><span className='green' onClick={this.state.currentCount < 1 ? this.set_cecs : this.not_sec}>Отправить код повторно</span></Link> через 00:{this.state.currentCount > 9 ? '' : '0'}{this.state.currentCount} секунд</span>
    );
  }
}

export default Clock;