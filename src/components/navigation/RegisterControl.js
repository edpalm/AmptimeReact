import React, { Component } from 'react'
import '../../styles/navButtons.css'

class registerButton extends Component {
  toggleRegisterModal () {
    console.log('ye')
    document.querySelector('.registerModal').style.display = 'block'
  }

  render () {
    return (
      <button className='register' onClick={this.toggleRegisterModal}>Register</button>
    )
  }
}

export default registerButton
