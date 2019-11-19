import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Knob extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('input', this.props.onInput)
  }

  render () {
    return (
      <webaudio-knob id={this.props.id} min={this.props.min} max={this.props.max} diameter={this.props.diameter} data-active='false' invert='0' outline='0' />
    )
  }
}

export default Knob
