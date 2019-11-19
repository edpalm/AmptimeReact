
import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.scss'
/*
 * TODO: change value of guitaramp.js mastergainnode on change
*/
class MasterGain extends Component {
  constructor () {
    super()
    this.state = {value: 0}
  }

  handleChange (e) {
    this.setState({value: e.target.value})
    // change gainvalue.
  }

  render () {
    return (
      <webaudio-knob id='volumeKnob' className='masterGain' src='img/sonatom.png' width='64' height='64' sprites='100' min='0' max='10' step='0.01' outline='0' />
    )
  }
}

export default MasterGain
