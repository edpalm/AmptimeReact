import React from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.css'
import AddEffectModal from './AddEffectModal'
import AddEffectButton from './AddEffectButton'
import PowerButton from './PowerButton'

class GuitarAmp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.addEffectModule = this.addEffectModule.bind(this)
    this.toggleAudioState = this.toggleAudioState.bind(this)
  }

  componentDidMount () {
    this.setupAudioCtx()
    this.getUserAudioSource()
  }

  setupAudioCtx () {
    let AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioCtx = new AudioContext({
      latencyHint: 'interactive',
      sampleRate: 48000
    })
    this.audioState = false
  }

  getUserAudioSource () {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        let source = this.audioCtx.createMediaStreamSource(stream)
        // forEach object in effect-module-array.
        // connect effectModules[currentIndex].output property to audioModules[currentIndex + 1].input
        console.log(source)
      })
  }

  toggleAudioState () {
    console.log('power on/off')
    this.audioState = !this.audioState
    if (this.audioState) {
      this.audioCtx.resume()
      console.log(this.audioCtx.state)
    } else {
      this.audioCtx.suspend()
      console.log(this.audioCtx.state)
    }
  }

  addEffectModule (e) {
    console.log(e.target.value)
    // update array of effect-module-objects
    // assign id's
  }

  render () {
    // forEach array effectModule
    // add correct effectModule to the htmlArray.
    // add ref/callback to each effectModule to change the values in the web audio node array
    return (
      <div className='guitarAmp'>
        <div className='guitarAmpToolbar'>
          <PowerButton toggleAudioState={this.toggleAudioState} />
          <AddEffectButton />
        </div>
        <div className='effectArea'>
          <AddEffectModal addEffectModule={this.addEffectModule} />
          <p>EffectArea</p>
        </div>
      </div>
    )
  }
}

export default GuitarAmp
