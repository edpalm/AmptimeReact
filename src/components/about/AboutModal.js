import React, { Component } from 'react'
import '../../styles/modals.css'
/**
 *
 ** Modal showing information about the webapplication. How to use, attributions. Author information
 */
class AboutModal extends Component {
  toggleModal (e) {
    if (e.target.className === 'aboutModal' || e.target.className === 'closeButton') {
      document.querySelector('.aboutModal').style.display = 'none'
    }
  }

  render () {
    return (
      <div className='aboutModal' onClick={this.toggleModal}>
        <div className='modal-content animate' >
          <div className='modalContainer'>
            <h2>About</h2>
            <p>Attributions, credit, how to, embedded video with instructions?</p>
          </div>
          <div className='modalContainer'>
            <button onClick={this.toggleModal}className='closeButton' type='button'>Close</button>
          </div>
        </div>
      </div>
    )
  }
}

export default AboutModal
