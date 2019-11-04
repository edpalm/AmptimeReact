import React, { Component } from 'react'
import '../../styles/navButtons.css'

class LoginButton extends Component {
  toggleLoginModal () {
    document.querySelector('.loginModal').style.display = 'block'
  }

  render () {
    return (
      <button className='login' onClick={this.toggleLoginModal}>Login</button>
    )
  }
}

export default LoginButton
