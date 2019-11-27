import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Wrapper for WebAudioControls knob.
class Knob extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('input', this.props.onInput)
  }

  componentWillUnmount () {
    ReactDOM.findDOMNode(this).removeEventListener('input', this.props.onInput, false)
  }

  render () {
    return (
      <webaudio-knob src={this.props.src}
        id={this.props.id}
        value={this.props.value}
        defvalue={this.props.defvalue}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        width={this.props.width}
        height={this.props.height}
        sprites={this.props.sprites}
        sensitivity={this.props.sensitivity}
        valuetip={this.props.valuetip}
        tooltip={this.props.tooltip}
        enable={this.props.enable}
        outline={this.props.outline}
        diameter={this.props.diameter} />
    )
  }
}

export default Knob
