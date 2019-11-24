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
    this.getUserAudioSource()

    this.state = {
      audioSourceConnected: false,
      effectModules: []
    }

    this.effectID = 0
    this.effectModules = []
    this.effectChain = []
    this.masterGain = []

    // Callback binds
    this.addEffectModule = this.addEffectModule.bind(this)
    this.toggleAudioState = this.toggleAudioState.bind(this)
  }

  componentDidUpdate () {
    if (this.state.audioSourceConnected) {
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
    this.setState({audioSourceConnected: true})
  }

  setUpEffectChain () {
    let noEffectHasBeenAdded = this.effectChain.length === 0
    let isFirstEffect = this.effectChain.length === 1

    let masterGain = this.masterGain[0]
    let previousEffect = this.effectChain[this.effectChain.length - 2]
    let addedEffect = this.effectChain[this.effectChain.length - 1]

    if (noEffectHasBeenAdded) {
      this.source.connect(masterGain)
    } else {
      if (isFirstEffect) {
        this.source.disconnect(masterGain)
        this.source.connect(addedEffect.input)
      } else {
        previousEffect.output.disconnect(masterGain)
        previousEffect.output.connect(addedEffect.input)
      }
      let hasInternalChain = addedEffect.internalChain.length > 0
      if (hasInternalChain) {
        let lastInternalNode = addedEffect.internalChain.length - 1
        addedEffect.internalChain.forEach((internalNode, i) => {
          if (i === lastInternalNode) {
            internalNode.connect(addedEffect.output)
          } else {
            internalNode.connect(addedEffect.internalChain[i + 1])
          }
        })
      }
      addedEffect.output.connect(masterGain)
    }
  }

  // callback for powerswitch
  async toggleAudioState () {
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume()
      console.log(this.audioCtx.state)
    } else {
      await this.audioCtx.suspend()
      console.log(this.audioCtx.state)
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
    const effectModules =
      this.state.effectModules.map(effectModule => <EffectModule
        key={effectModule.effectID}
        effectType={effectModule.effectType}
        effectChain={this.effectChain}
        audioCtx={this.audioCtx}
        id={effectModule.effectID} />)
    return (
      <div className='guitarAmp'>
        <div className='guitarAmpToolbar'>
          <PowerSwitch toggleAudioState={this.toggleAudioState} />
          <AddEffectButton />
          <MasterGain audioCtx={this.audioCtx} masterGain={this.masterGain} />
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
