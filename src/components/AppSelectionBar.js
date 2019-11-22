import React, { Component } from 'react'

class AppSelectionBar extends Component {
  handleClick (e) {
    e.stopPropagation()
    e.preventDefault()

    const apps = {
      GUITARAMP: 'guitarAmp',
      DRUMKEYS: 'drumKeys'
    }

    console.log(e.target.value)
    switch (e.target.value) {
      case apps.GUITARAMP:
        document.querySelector('.guitarAmp').style.display = 'flex'
        // other apps display = none
        // add cases
        break
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
