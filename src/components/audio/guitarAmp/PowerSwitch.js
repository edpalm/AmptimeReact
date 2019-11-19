import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.scss'

class PowerSwitch extends Component {
  constructor () {
    super()
    this.state = { checked: false }
  }

  handleChange (checked) {
    this.setState({ checked })
    // set audio state in parent component
    let powerIsOn = checked
    this.props.toggleAudioState(powerIsOn)
  }

  render () {
    return (
      <webaudio-switch width='64' height='64' id='powerSwitch' data-active='false' invert='1' outline='0' />
    )
  }
}

export default PowerSwitch
