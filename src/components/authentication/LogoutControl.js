import React, { Component } from 'react'
import '../../styles/navButtons.css'

class LogoutControl extends Component {
  render () {
    return (
      <form method='post' action='/logout'>
        <button type='submit' className='logout'>Logout</button>
      </form>
    )
  }
}

export default LogoutControl
