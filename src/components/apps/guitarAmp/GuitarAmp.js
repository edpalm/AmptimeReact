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
    /* // Disconnect all nodes.
    this.disconnectChain()
    // Reconnect all nodes.
    let noEffectsHasBeenAdded = this.effectChain.length === 0
    if (noEffectsHasBeenAdded) {
      this.source.connect(this.masterGain[0])
    } else {
      this.source.connect(this.effectChain[0].input) // connect to first effect input.
      let lastEffectInChain = this.effectChain.length - 1

      this.effectChain.forEach((effect, i) => {
        let hasInternalChain = effect.internalChain.length > 0 // check if internalchain exists
        if (hasInternalChain) {
          effect.input.connect(effect.internalChain[0]) // connect effectmodule input to first in internalchain
          let lastInternalNode = effect.internalChain.length - 1
          effect.internalChain.forEach((internalNode, j) => {
            if (j === lastInternalNode) {
              console.log('last internal')
              console.log('connecting to output')
              internalNode.connect(effect.output) // Connect to effectmodule output
            } else {
              console.log('not last internal')
              internalNode.connect(effect.internalChain[j + 1]) // Connect to next internal node.
            }
          })
        } else {
        // no internal chain
          effect.input.connect(effect.output)
          console.log('empty internal chain')
          console.log('connecting to output')
        }
        if (i === lastEffectInChain) {
          console.log('connecting to masterGain')
          effect.output.connect(this.masterGain[0])
          // if last effectModule. connect output to mastergain
        } else {
          console.log('connecting to next effect input')
          let nextEffect = i + 1
          effect.output.connect(this.effectChain[nextEffect].input)
          // if not last effectmodule. connect output to next effect input.
        }
      })
    }
    this.masterGain[0].connect(this.audioCtx.destination)
    console.log(this.audioCtx) */

// REFACTOR IMPROVEMENT
    // if no effects.
      // connect source to masterGain

    // else
    // disconnect last added effect from it's destination.
    // connect last effect to new effect input

    // if internalChain
      // connect new effect input to first in internalchain
      // foreach internal
        // if last internal node
          // connect to output
        // else
          // connect to next internal
    // else
       // connect input to output
    // connect output to mastergain
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
