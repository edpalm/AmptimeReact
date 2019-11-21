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
      <webaudio-switch
        src={this.props.src}
        value={this.props.value}
        defvalue={this.props.defvalue}
        width={this.props.width}
        height={this.props.height}
        id={this.props.id}
        type={this.props.type}
        group={this.props.group}
        invert={this.props.invert}
        tooltip={this.props.tooltip}
        enable={this.props.enable}
        outline={this.props.outline}
        midilearn={this.props.midilearn}
        midicc={this.props.midicc} />
    )
  }
}

export default Switch
