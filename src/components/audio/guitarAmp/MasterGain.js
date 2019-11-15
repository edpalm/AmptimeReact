
import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/addEffectButton.css'
/*
 * TODO: change value of guitaramp.js mastergainnode on change
*/
class MasterGain extends Component {
  constructor () {
    super()
    this.state = {value: 0}
    this.handleEvent = this.handleEvent.bind(this)
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    // change gainvalue.
  }

  render () {
    return (
      <input
        onChange={this.handleChange}
        type='range'
        min='0'
        max='10'
        value={this.state.value}
        step='0.1' />
    )
  }
}

export default MasterGain
