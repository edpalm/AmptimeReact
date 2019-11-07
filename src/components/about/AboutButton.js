import React, { Component } from 'react'

class LogoutControl extends Component {
  toggleAboutModal () {
    document.querySelector('.aboutModal').style.display = 'block'
  }

  render () {
    return (
      <button className='about' onClick={this.toggleAboutModal}>About</button>
    )
  }
}

export default LogoutControl
