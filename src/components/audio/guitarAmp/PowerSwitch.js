import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.scss'
import Switch from '../../gui/Switch'

// Wrapper for custom element & events.
class PowerSwitch extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.toggleAudioState()
  }

  render () {
    return (
      <Switch onClick={this.handleClick} />
    )
  }
}

export default PowerSwitch
