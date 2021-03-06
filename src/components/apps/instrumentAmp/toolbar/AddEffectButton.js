import React, { Component } from 'react'
import '../../../../styles/instrumentAmp/instrumentAmp.scss'

class AddEffectButton extends Component {
  toggleAddEffectModal (e) {
    document.querySelector('.addEffectModal').style.display = 'block'
  }

  render () {
    return (
      <button onClick={this.toggleAddEffectModal} id='addEffectButton' type='button'>&#43;</button>
    )
  }
}

export default AddEffectButton
