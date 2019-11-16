import React, { Component } from 'react'
import Gain from './effects/Gain'
import '../../../../styles/audio/guitarAmp/effectModules.scss'

// Controller & Facade for effect modules.
class EffectModule extends Component {
  render () {
    let effectModule
    if (this.props.effectType === 'gain') {
      effectModule = <Gain effectChain={this.props.effectChain} audioCtx={this.props.audioCtx} />
    }
    return (
      <div className='effectModule'>
        {effectModule}
      </div>
    )
  }
}

export default EffectModule
