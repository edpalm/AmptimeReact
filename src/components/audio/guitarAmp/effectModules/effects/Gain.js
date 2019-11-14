import React, { Component } from 'react'

class Gain extends Component {
  constructor () {
    super()
    this.state = {} // setup proper states for gain.
    /*
      Setup signal chain of audioCtx nodes for the gain effect module. this.props.audioCtx
      Set initial state values
    */
  }

  render () {
    // html switch for on/off.
    // html knob elements.
    // Tie knob changes to state props.
    // display showing state props?
    return (
      <div>
        <button type='button'>Gain</button>
        <button type='button'>OnOff</button>
      </div>
    )
  }
}

export default Gain
