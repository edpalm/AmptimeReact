import React from 'react'
import InstrumentAmp from './apps/instrumentAmp/InstrumentAmp'
import DrumKeys from './apps/drumKeys/DrumKeys'
class AppZone extends React.Component {
  constructor (props) {
    super(props)
    this.setupAudioContexts()
  }

  // TODO: Add audioCtx for each application.
  setupAudioContexts () {
    let AudioContext = window.AudioContext || window.webkitAudioContext
    this.instrumentAmpAudioCtx = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 48000
    })
  }

  render () {
    // send loggedin status as prop, render preset tools if logged in.
    return (
      <React.Fragment>
        <InstrumentAmp audioCtx={this.instrumentAmpAudioCtx} />
        <DrumKeys />
      </React.Fragment>
    )
  }
}

export default AppZone
