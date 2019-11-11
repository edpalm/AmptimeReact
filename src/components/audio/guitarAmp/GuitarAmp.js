import React from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.css'
import AddEffectModal from './AddEffectModal'
import AddEffectButton from './AddEffectButton'
import PowerSwitch from './PowerSwitch'

class GuitarAmp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {effectModules: []}
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

  // callback for powerswitch
  toggleAudioState (powerIsOn) {
    if (powerIsOn) {
      this.audioCtx.resume()
    } else {
      this.audioCtx.suspend()
    }
  }

  // callback for effect-selection modal
  addEffectModule (e) {
    this.createEffectModule(e.target.value) // get returned module
    // add to  array of effect-module-objects
  }

  createEffectModule (effectType) {
    switch (effectType) {
      case 'cabinet':
        console.log('cab')
        break
      case 'compressor':
        console.log('comp')
        break
      case 'delay':
        console.log('delay')
        break
      case 'distortion':
        console.log('dist')
        break
      case 'eq3':
        console.log('eq3')
        break
      case 'eq5':
        console.log('eq5')
        break
      case 'eq7':
        console.log('eq7')
        break
      case 'gain':
        console.log('gain')
        break
      case 'reverb':
        console.log('reverb')
        break
      default:
        break
    }
  }
  render () {
    // forEach array effectModule
    // add correct effectModule to the htmlArray.
    // add ref/callback to each effectModule to change the values in the web audio node array
    return (
      <div className='guitarAmp'>
        <div className='guitarAmpToolbar'>
          <PowerSwitch toggleAudioState={this.toggleAudioState} />
          <AddEffectButton />
          <AddEffectModal addEffectModule={this.addEffectModule} />
        </div>
        <div className='effectArea'>
          <p>EffectArea</p>
        </div>
      </div>
    )
  }
}

export default GuitarAmp
