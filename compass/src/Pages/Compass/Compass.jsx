import React from 'react'
import "./Compass.css"
import Mainbar from '../../Components/mainbar/Mainbar'
import Buildings from '../../Components/Buildings/Buildings'

const Compass = () => {
  return (
    <div className='compass'>
        <Mainbar/>
        <Buildings/>
    </div>
  )
}

export default Compass