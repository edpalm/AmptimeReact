import React from 'react'
import GuitarAmp from './apps/guitarAmp/GuitarAmp'
import DrumKeys from './apps/drumKeys/DrumKeys'

class AppArea extends React.Component {
  render () {
    // send loggedin status as prop, render preset tools if logged in.
    return (
      <div>
        <GuitarAmp />
        <DrumKeys />
      </div>
    )
  }
}

export default AppArea
