import React from 'react'
// import logo from './logo.svg'
import './App.css'

const fetch = require('node-fetch')

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
  // testing proxied route.
    let response = await fetch('http://localhost:8080/testproxy', {
      method: 'POST'
    })
    console.log(response)
    let jsonResponse = await response.json()
    console.log(jsonResponse.message)
  }

  render () {
    return (<p>hej</p>)
  }
}

export default App
