import React from 'react'
import '../../../styles/audio/guitarAmp/guitarAmp.css'
import AddEffectModal from './AddEffectModal'
import AddEffectButton from './AddEffectButton'

class GuitarAmp extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div className='guitarAmp'>
        <div className='guitarAmpToolbar'>
          <webaudio-switch />
          <AddEffectButton />
        </div>
        <div className='effectArea'>
          <AddEffectModal />
          <p>EffectArea</p>
        </div>
      </div>
    )
  }
}

export default GuitarAmp
