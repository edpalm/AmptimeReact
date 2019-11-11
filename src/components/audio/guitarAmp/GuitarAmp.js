import React from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.css'
import AddEffectModal from './AddEffectModal'
import AddEffectButton from './AddEffectButton'
import PowerSwitch from './PowerSwitch'
import EffectModule from './effectModules/EffectModule'

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
  }

  getUserAudioSource () {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        let source = this.audioCtx.createMediaStreamSource(stream)
        console.log(source)
        // forEach effectmodule
        // connect effectModules output to next effectmodule input
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
    let effectModule = e.target.value
    let newArrayChain = this.state.effectModules.concat(effectModule)
    this.setState({effectModules: newArrayChain})
  }
  render () {
    let key = 0
    let id = 0
    const effectModules = this.state.effectModules.map(effectType => <EffectModule key={'EffectModule' + key++} effectType={effectType} audioCtx={this.audioCtx} id={id++} />)

    return (
      <div className='guitarAmp'>
        <div className='guitarAmpToolbar'>
          <PowerSwitch toggleAudioState={this.toggleAudioState} />
          <AddEffectButton />
          <AddEffectModal addEffectModule={this.addEffectModule} />
        </div>
        <div className='effectArea'>
          {effectModules}
        </div>
      </div>
    )
  }
}

export default GuitarAmp
