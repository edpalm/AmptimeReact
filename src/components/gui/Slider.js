import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Wrapper for WebAudioControls Slider.
class Slider extends Component {
  componentDidMount () {
    ReactDOM.findDOMNode(this).addEventListener('input', this.props.onInput)
  }

  componentWillUnmount () {
    ReactDOM.findDOMNode(this).removeEventListener('input', this.props.onInput, false)
  }

  render () {
    return (
      <webaudio-slider
        id={this.props.id}
        src={this.props.src}
        knobsrc={this.props.knobsrc}
        value={this.props.value}
        defvalue={this.props.defvalue}
        min={this.props.min}
        max={this.props.max}
        step={this.props.step}
        width={this.props.width}
        height={this.props.height}
        knobwidth={this.props.knobwidth}
        knobheight={this.props.knobheight}
        ditchlength={this.props.ditchlength}
        direction={this.props.direction}
        tracking={this.props.tracking}
        sensitivity={this.props.sensitivity}
        valuetip={this.props.valuetip}
        tooltip={this.props.tooltip}
        conv={this.props.conv}
        enable={this.props.enable}
        outline={this.props.outline}
        midilearn={this.props.midilearn}
        midicc={this.props.midicc} />
    )
  }
}

export default Slider
