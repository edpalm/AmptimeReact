import React from 'react'
// import logo from './logo.svg'
import './styles/App.css'
import AboutButton from './components/about/AboutButton'
import LoginController from './components/authentication/LoginController'
import AppSelectionBar from './components/AppSelectionBar'
import AppArea from './components/AppArea'

import AboutModal from './components/about/AboutModal'
import LoginModal from './components/authentication/LoginModal'
import RegisterModal from './components/authentication/RegisterModal'

const fetch = require('node-fetch')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      selectedApp: ''
    }
  }

  // move to constructor?
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
        <nav className='navigation'>
          <AboutButton />
          <LoginController isLoggedIn={this.state.isLoggedIn} />
        </nav>
        <AppSelectionBar />
        <AppArea isLoggedIn={this.state.isLoggedIn} />
        <AboutModal />
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }
}

export default App
