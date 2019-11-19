import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Knob extends Component {
  componentDidMount () {
    console.log(this.props.onInput)
    ReactDOM.findDOMNode(this).addEventListener('input', this.props.onInput)
  }

  render () {
    return (
      <webaudio-knob id={this.props.id} min={this.props.min} max={this.props.max} data-active='false' invert='0' outline='0' />
    )
  }
}

export default Knob
