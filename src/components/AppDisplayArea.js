import React from 'react'
import GuitarAmp from './apps/guitarAmp/GuitarAmp'
import DrumKeys from './apps/drumKeys/DrumKeys'

class AppDisplayArea extends React.Component {
  render () {
    // send loggedin status as prop, render preset tools if logged in.
    return (
      <React.Fragment>
        <GuitarAmp />
        <DrumKeys />
      </React.Fragment>
    )
  }
}

export default AppDisplayArea
