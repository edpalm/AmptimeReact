import React from 'react'

import RegisterControl from './RegisterControl'
import LoginControl from './LoginControl'
import LogoutControl from './LogoutControl'

class LoginController extends React.Component {
  render () {
    console.log(this.props)
    if (this.props.isLoggedIn) {
      return (
        <LogoutControl />
      )
    } else {
      return (
        <div>
          <LoginControl />
          <RegisterControl />
        </div>
      )
    }
  }
}

export default LoginController
