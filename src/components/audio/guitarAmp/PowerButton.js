import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/addEffectButton.css'

class PowerButton extends Component {
  // find right eventhandler for the switch.
  render () {
    return (
      <div>
        <webaudio-switch onClick={this.props.toggleAudioState}className='powerButton' />
      </div>
    )
  }
}

export default PowerButton
