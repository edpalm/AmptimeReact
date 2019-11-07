import React from 'react'
import '../../../styles/guitarAmp.css'

class GuitarAmp extends React.Component {
  render () {
    console.log(this.props)
    return (
      <div className='guitarAmp'>
        <div className='guitarAmpToolbar'>
          <p className='guitarAmpToolbar'>Guitar amp toolbar</p>
        </div>
        <div className='effectArea'>
          <p className='effectArea'>EffectArea</p>
        </div>
      </div>
    )
  }
}

export default GuitarAmp
