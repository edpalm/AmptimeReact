import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.scss'
import Switch from '../../gui/Switch'

// Wrapper for custom element.
class PowerSwitch extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    e.stopPropagation()
    let powerIsOn
    if (e.target.value === 1) {
      powerIsOn = true
    } else {
      powerIsOn = false
    }
    this.props.toggleAudioState(powerIsOn)
  }

  render () {
    return (
      <Switch onClick={this.handleClick} />
    )
  }
}

export default PowerSwitch
