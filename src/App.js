import React from 'react'
// import logo from './logo.svg'
import './App.css'

import LoginController from './components/authentication/LoginController'

import LoginModal from './components/authentication/LoginModal'
import RegisterModal from './components/authentication/RegisterModal'

const fetch = require('node-fetch')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    let response = await fetch('/userLoggedInStatus', {
      method: 'GET'
      /* headers: {
        'Content-Type': 'application/json'
      } */
    })
    let jsonResponse = await response.json()
    this.setState({
      isLoggedIn: jsonResponse.isLoggedIn
    })
  }

  render () {
    return (
      <div>
        <nav>
          <LoginController isLoggedIn={this.state.isLoggedIn} />
        </nav>
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }
}

export default App
