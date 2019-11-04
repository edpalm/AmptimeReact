import React from 'react'
// import logo from './logo.svg'
import './App.css'

import LoginControl from './components/navigation/LoginControl'
import RegisterControl from './components/navigation/RegisterControl'

import LoginModal from './components/navigation/LoginModal'
import RegisterModal from './components/navigation/RegisterModal'

// const fetch = require('node-fetch')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
  // get logged in status
  }

  render () {
    return (
      <div>
        <nav>
          <LoginControl />
          <RegisterControl />
        </nav>
        <LoginModal />
        <RegisterModal />
      </div>
    )
  }
}

export default App
