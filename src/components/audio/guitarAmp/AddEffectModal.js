import React, { Component } from 'react'
import '../../../styles/modals.css'

class AddEffectModal extends Component {
  toggleModal (e) {
    if (e.target.className === 'addEffectModal' || e.target.className === 'closeButton') {
      document.querySelector('.addEffectModal').style.display = 'none'
    }
  }

  render () {
    return (
      <div className='addEffectModal' onClick={this.toggleModal}>
        <div className='modal-content animate' >
          <div className='modalContainer'>
            <h2>Add Effect</h2>
            <button type='button'>A</button>
          </div>
          <div className='modalContainer'>
            <button onClick={this.toggleModal}className='closeButton' type='button'>Close</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddEffectModal
