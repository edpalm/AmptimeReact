import React, { Component } from 'react'
import '../../styles/modals.css'

class RegisterModal extends Component {
  toggleModal (e) {
    if (e.target.className === 'registerModal' || e.target.className === 'cancelButton') {
      document.querySelector('.registerModal').style.display = 'none'
    }
  }

  render () {
    return (
      <div className='registerModal' onClick={this.toggleModal}>
        <form className='modal-content animate' action='/register' method='POST'>
          <div className='modalContainer'>
            <h2>Register</h2>
            <label htmlFor='username'>Username</label>
            <input type='text' placeholder='Enter Username' name='username' required autoComplete='off' />
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Enter Password' name='password' required autoComplete='off' />
            <button className='registerButton' type='submit'>Register</button>
          </div>
          <div className='modalContainer'>
            <button onClick={this.toggleModal}className='cancelButton' type='button'>Cancel</button>
          </div>
        </form>
      </div>
    )
  }
}

export default RegisterModal
