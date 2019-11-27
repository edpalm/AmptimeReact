import React, { Component } from 'react'
import Gain from './effects/Gain'
import Distortion from './effects/Distortion'
import Delay from './effects/Delay'
import '../../../styles/guitarAmp/guitarEffects.scss'

// Controller & Facade for effect modules.
class EffectModule extends Component {
  render () {
    const effects = {
      CABINET: 'cabinet',
      CHORUS: 'chorus',
      COMPRESSOR: 'compressor',
      DELAY: 'delay',
      DISTORTION: 'distortion',
      EQ3: 'eq3',
      EQ5: 'eq5',
      EQ7: 'eq7',
      GAIN: 'gain',
      REVERB: 'reverb'
    }

    const selectedEffect = this.props.effectType
    let effectModule

    switch (selectedEffect) {
      case effects.CABINET:
        // effectModule = <Cabinet effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.CHORUS:
          // effectModule = <Chorus effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.COMPRESSOR:
        // effectModule = <Compressor effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.DELAY:
        effectModule = <Delay effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.DISTORTION:
        effectModule = <Distortion effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.EQ3:
        // effectModule = <EQ3 effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.EQ5:
        // effectModule = <EQ5 effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.EQ7:
        // effectModule = <EQ7 effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.GAIN:
        effectModule = <Gain effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} id={this.props.id} />
        break
      case effects.REVERB:
        // effectModule = <Reverb effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      default: break
    }

    return (
      <div className='effectModule'>
        {effectModule}
      </div>
    )
  }
}

export default EffectModule
