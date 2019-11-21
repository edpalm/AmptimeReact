import React, { Component } from 'react'
import '../../../../styles/guitarAmp/guitarAmp.scss'
import Switch from '../../../gui/Switch'

// Wrapper for custom element & events.
class PowerSwitch extends Component {
  constructor (props) {
    super(props)
    this.height = 64
    this.width = 64
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    e.stopPropagation()
    e.preventDefault()
    this.props.toggleAudioState()
  }

  render () {
    return (
      <Switch onClick={this.handleClick} height={this.height} width={this.width} id='powerSwitch' />
    )
  }
}

export default PowerSwitch
