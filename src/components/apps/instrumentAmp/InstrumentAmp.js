import React from 'react'
import '../../../styles/instrumentAmp/instrumentAmp.scss'
import AddEffectModal from './AddEffectModal'
import AddEffectButton from './toolbar/AddEffectButton'
import PowerSwitch from './toolbar/PowerSwitch'
import MasterGain from './toolbar/MasterGain'
import EffectModule from '../../audio/effectModules/EffectModule'

class InstrumentAmp extends React.Component {
  constructor (props) {
    console.log(props)
    super(props)
    this.audioCtx = this.props.audioCtx

    this.state = {
      audioSourceConnected: false,
      impulseResponseBufferHasBeenGenerated: false, // TODO: Rename.
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

  componentDidMount () {
    this.getUserAudioSource()
  }

  componentDidUpdate () {
    if (this.state.audioSourceConnected) {
      this.setUpEffectChain()
    }
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
      addedEffect.output.connect(masterGain)
    }
  }

  //* Callback for powerswitch
  async toggleAudioState () {
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume()
    } else {
      await this.audioCtx.suspend()
    }
  }

  //* Callback for effect-selection modal.
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
    let effectModuleList =
      this.state.effectModules.map(effectModule =>
        <li className='listEffect' key={effectModule.effectID}>
          <EffectModule
            /* key={effectModule.effectID} */
            effectType={effectModule.effectType}
            effectChain={this.effectChain}
            audioCtx={this.audioCtx}
            id={effectModule.effectID} />
        </li>)
    return (
      <div className='instrumentAmp'>
        <div className='instrumentAmpToolbar'>
          <PowerSwitch toggleAudioState={this.toggleAudioState} />
          <AddEffectButton />
          <MasterGain audioCtx={this.audioCtx} masterGain={this.masterGain} />
        </div>
        <div className='effectArea'>
          <ul className='effectList'>
            {effectModuleList}
          </ul>
        </div>
        {/* <div className='effectArea'>
          {effectModules}
        </div> */}
        <AddEffectModal addEffectModule={this.addEffectModule} />
      </div>
    )
  }
}

export default InstrumentAmp
