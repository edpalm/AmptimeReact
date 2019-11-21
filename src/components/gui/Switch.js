import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Wrapper for WebAudioControls Switch.
class Switch extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('click', this.props.onClick)
  }
  componentWillUnmount () {
    ReactDOM.findDOMNode(this).removeEventListener('click', this.props.onClick, false)
  }
  render () {
    return (
      <webaudio-switch width={this.props.width} height={this.props.height} id={this.props.id} data-active='false' invert='0' outline='0' />
    )
  }
}

export default Switch
