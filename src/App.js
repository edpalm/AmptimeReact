import React from 'react'
// import logo from './logo.svg'
import './styles/App.css'
import AboutButton from './components/about/AboutButton'
import LoginController from './components/authentication/LoginController'
import AppSelectionBar from './components/AppSelectionBar'
import AppDisplayArea from './components/AppDisplayArea'

import AboutModal from './components/about/AboutModal'
import LoginModal from './components/authentication/LoginModal'
import RegisterModal from './components/authentication/RegisterModal'

const axios = require('axios')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      selectedApp: ''
    }
  }

  async componentDidMount () {
    let response = await axios.get('/userLoggedInStatus')
    this.setState({
      isLoggedIn: response.data.isLoggedIn
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
        <AppDisplayArea isLoggedIn={this.state.isLoggedIn} />
        <AboutModal />
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }
}

export default App
