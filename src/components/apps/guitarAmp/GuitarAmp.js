import React from 'react'
import '../../../styles/guitarAmp/guitarAmp.scss'
import AddEffectModal from './AddEffectModal'
import AddEffectButton from './toolbar/AddEffectButton'
import PowerSwitch from './toolbar/PowerSwitch'
import MasterGain from './toolbar/MasterGain'
import EffectModule from '../../audio/effectModules/EffectModule'

class GuitarAmp extends React.Component {
  constructor (props) {
    super(props)
    this.setupAudioCtx()
    this.state = {effectModules: []}

    this.effectID = 0
    this.effectModules = []
    this.effectChain = []

    // Callback binds
    this.addEffectModule = this.addEffectModule.bind(this)
    this.toggleAudioState = this.toggleAudioState.bind(this)
  }

  componentDidMount () {
    // this.setupAudioCtx()
    this.getUserAudioSource()
  }

  componentDidUpdate () {
    if (this.effectChain.length > 0) {
      this.setUpEffectChain()
    }
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
        audioNode.input.connect(audioNode.output)
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
  async toggleAudioState () {
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume()
    } else {
      await this.audioCtx.suspend()
    }
  }

  // callback for effect-selection modal
  addEffectModule (e) {
    let effectType = e.target.value
    let effectID = this.effectID++

    let effectModule = {
      effectType: effectType,
      effectID: effectType + effectID
    }

    let newArrayChain = this.state.effectModules.concat(effectModule)
    this.setState({effectModules: newArrayChain})
  }

  render () {
    const effectModules = this.state.effectModules.map(effectModule => <EffectModule key={effectModule.effectID} effectType={effectModule.effectType} effectChain={this.effectChain} audioCtx={this.audioCtx} id={effectModule.effectID} />)

    return (
      <div className='guitarAmp'>
        <div className='guitarAmpToolbar'>
          <PowerSwitch toggleAudioState={this.toggleAudioState} />
          <AddEffectButton />
          <MasterGain audioCtx={this.audioCtx} />
        </div>
        <div className='effectArea'>
          {effectModules}
        </div>
        <AddEffectModal addEffectModule={this.addEffectModule} />
      </div>
    )
  }
}

export default GuitarAmp
