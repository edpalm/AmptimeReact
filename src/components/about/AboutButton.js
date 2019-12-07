import React, { Component } from 'react'
/**
 ** Buttoncomponent opening About-Modal
 */
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
