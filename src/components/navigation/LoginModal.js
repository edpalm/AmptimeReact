import React, { Component } from 'react'
import '../../styles/modals.css'

class LoginModal extends Component {
  toggleCheckBox () {
    // todo, set state?
    console.log('toggle checkbox')
  }

  toggleModal (e) {
    if (e.target.className === 'loginModal' || e.target.className === 'cancelButton') {
      document.querySelector('.loginModal').style.display = 'none'
    }
  }

  render () {
    return (
      <div className='loginModal' onClick={this.toggleModal}>
        <form className='modal-content animate' action='/login' method='POST'>
          <div className='modalContainer'>
            <h2>Login</h2>
            <label htmlFor='username'>Username</label>
            <input type='text' placeholder='Enter Username' name='username' required autoComplete='on' />
            <label htmlFor='password'>Password</label>
            <input type='password' placeholder='Enter Password' name='password' required autoComplete='on' />
            <button className='loginButton' type='submit'>Login</button>
            <label>
              <input onChange={this.toggleCheckBox} type='checkbox' checked='checked' name='remember' /> Remember me
            </label>
          </div>
          <div className='modalContainer'>
            <button onClick={this.toggleModal}className='cancelButton' type='button'>Cancel</button>
            <span className='forgotPass'>
              <button>Forgot Password?</button>
            </span>
          </div>
        </form>
      </div>
    )
  }
}

export default LoginModal
