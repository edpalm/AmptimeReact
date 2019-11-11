import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/switches.css'
import Switch from 'react-switch'

class PowerSwitch extends Component {
  constructor () {
    super()
    this.state = { checked: false }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (checked) {
    this.setState({ checked })

    // set audio state in parent component
    let powerIsOn = checked
    this.props.toggleAudioState(powerIsOn)
  }

  render () {
    return (
      <label>
        <Switch onChange={this.handleChange} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false} className='powerSwitch' />
      </label>
    )
  }
}

export default PowerSwitch
