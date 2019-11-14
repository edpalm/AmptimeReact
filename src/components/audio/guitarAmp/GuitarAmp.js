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
    this.effectModules = []
    this.addEffectModule = this.addEffectModule.bind(this)
    this.toggleAudioState = this.toggleAudioState.bind(this)
    this.effectChain = []
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

  async getUserAudioSource () {
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    this.source = this.audioCtx.createMediaStreamSource(stream)
  }

  setUpEffectChain () {
    this.source.connect(this.effectChain[0].input) // connect source to 1st node in chain.

    const lastEffectInChain = this.effectChain.length - 1

    this.effectChain.forEach((audioNode, i) => {
      if (audioNode.internalChain.length === 0) {
        // connect node input to node output directly.
      } else {
        // connect input through chain and to output.
      }
      if (i === lastEffectInChain) {
        // connect to master output.
      } else {
        // connect to next index input.
      }
    })
    console.log(this.source)
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

  componentDidUpdate () {
    if (this.effectChain.length > 0) {
      console.log('added new effect')
      this.setUpEffectChain()
    }
  }

  render () {
    // Add master gain component in guitarAmpToolbar
    let key = 0
    let id = 0
    const effectModules = this.state.effectModules.map(effectType => <EffectModule key={'EffectModule' + key++} effectType={effectType} effectChain={this.effectChain} audioCtx={this.audioCtx} id={id++} />)

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
