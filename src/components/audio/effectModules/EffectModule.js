import React, { Component } from 'react'

import Cabinet from './effects/Cabinet'
// import Chorus from './effects/Chorus'
// import Compressor from './effects/Compressor'
import Delay from './effects/Delay'
import Distortion from './effects/Distortion'
// import EQ1 from './effects/EQ1
// import EQ3 from './effects/EQ3
// import EQ5 from './effects/EQ5
// import Flanger from './effects/Flanger
import Gain from './effects/Gain'
// import Passfilter from './effects/Passfilter
// import Phaser from './effects/Phaser
import Reverb from './effects/Reverb'
// import Tremolo from './effects/Tremolo

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
      EQ1: 'eq1',
      EQ3: 'eq3',
      EQ5: 'eq5',
      FLANGER: 'flanger',
      GAIN: 'gain',
      PASSFILTER: 'passfilter',
      PHASER: 'phaser',
      REVERB: 'reverb',
      TREMOLO: 'tremolo'
    }

    const selectedEffect = this.props.effectType
    let effectModule

    switch (selectedEffect) {
      case effects.CABINET:
        effectModule = <Cabinet effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.CHORUS:
          // effectModule = <Chorus effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.COMPRESSOR:
        // effectModule = <Compressor effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.DELAY:
        effectModule = <Delay effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} id={this.props.id} />
        break
      case effects.DISTORTION:
        effectModule = <Distortion effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} id={this.props.id} />
        break
      case effects.LOWPASS:
      // effectModule = <Lowpass effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.HIGHPASS:
          // effectModule = <Highpass effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.EQ1:
        // effectModule = <EQ1 effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.EQ3:
        // effectModule = <EQ3 effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.EQ5:
        // effectModule = <EQ5 effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
        break
      case effects.GAIN:
        effectModule = <Gain effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} id={this.props.id} />
        break
      case effects.REVERB:
        effectModule = <Reverb effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
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
