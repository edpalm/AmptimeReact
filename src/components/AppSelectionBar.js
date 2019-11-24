import React, { Component } from 'react'

class AppSelectionBar extends Component {
  constructor (props) {
    super(props)

    this.apps = {
      GUITARAMP: 'guitarAmp',
      DRUMKEYS: 'drumKeys'
    }

    let defaultApp = this.apps.GUITARAMP

    this.state = {
      selectedApp: defaultApp
    }

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick (e) {
    e.stopPropagation()
    e.preventDefault()

    let selectedApp = e.target.value

    this.setState({selectedApp: selectedApp})
  }

  componentDidUpdate () {
    switch (this.state.selectedApp) {
      case this.apps.GUITARAMP:
        document.querySelector('.guitarAmp').style.display = 'flex'
        // set other app display styles.
        break
      case this.apps.DRUMKEYS:
        console.log('drumkeys')
    }
  }

  render () {
    return (
      <div className='appSelectionBar'>
        <button onClick={this.handleClick} className='appSelectButton' value='guitarAmp' type='button' >App 1</button>
        <button onClick={this.handleClick} className='appSelectButton' value='drumKeys' >App 2</button>
      </div>
    )
  }
}

export default AppSelectionBar
