import React, { Component } from 'react'
import '../../../styles/audio/guitarAmp/addEffectButton.css'

class AddEffectButton extends Component {
  toggleAddEffectModal (e) {
    document.querySelector('.addEffectModal').style.display = 'block'
  }

  render () {
    return (
      <button onClick={this.toggleAddEffectModal}className='addEffectButton' type='button'>Add Effect</button>
    )
  }
}

export default AddEffectButton
