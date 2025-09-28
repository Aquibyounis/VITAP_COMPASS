import React from 'react'
import "./Compass.css"
import Mainbar from '../../Components/mainbar/Mainbar'
import Buildings from '../../Components/Buildings/Buildings'
import {useNavigate} from "react-router-dom";

const Compass = () => {
    const navigate = useNavigate(); // <-- hook
  
  return (
    <div className='compass'>
        <Mainbar/>
        <Buildings/>
        <div className="btnn">
          <button className='btn2' onClick={() => navigate("/")}>Visit AI <i class="fa-solid fa-up-right-from-square"></i></button>
        </div>
    </div>
  )
}

export default Compass