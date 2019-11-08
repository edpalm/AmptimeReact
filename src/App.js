import React from 'react'
// import logo from './logo.svg'
import './styles/App.css'
import AboutButton from './components/about/AboutButton'
import LoginController from './components/authentication/LoginController'
import AudioController from './components/audio/AudioController'

import AboutModal from './components/about/AboutModal'
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
        <nav className='navigation'>
          <AboutButton />
          <LoginController isLoggedIn={this.state.isLoggedIn} />
        </nav>
        <div className='toolbar'>
          <p>Application choice toolbar</p>
        </div>
        <AudioController isLoggedIn={this.state.isLoggedIn} />
        <AboutModal />
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }
}

export default App
