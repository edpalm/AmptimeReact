import React, { Component } from 'react'

class AppSelectionBar extends Component {
  constructor (props) {
    super(props)
    this.apps = {
      INSTRUMENTAMP: 'instrumentAmp',
      DRUMKEYS: 'drumKeys'
    }
    let defaultApp = this.apps.INSTRUMENTAMP //! Default selected app when amptime is loaded. placeholder.
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
    // TODO: Get microphone approval if InstrumentAmp is selected.
  }
  componentDidUpdate () {
    switch (this.state.selectedApp) {
      case this.apps.INSTRUMENTAMP:
        document.querySelector('.instrumentAmp').style.display = 'flex'
        //* set other apps display styles.
        break
      case this.apps.DRUMKEYS:
        document.querySelector('.instrumentAmp').style.display = 'none'
        //* set other apps display styles.
        console.log('drumkeys')
        break
      default:
        //* temp default
        document.querySelector(`. + ${this.state.defaultApp}`).style.display = 'flex'
    }
  }
  render () {
    return (
      <div className='appSelectionBar'>
        <button onClick={this.handleClick} className='appSelectButton' value={this.apps.INSTRUMENTAMP} type='button' >G-Amp</button>
        <button onClick={this.handleClick} className='appSelectButton' value={this.apps.DRUMKEYS} >D-Keys</button>
      </div>
    )
  }
}
export default AppSelectionBar
