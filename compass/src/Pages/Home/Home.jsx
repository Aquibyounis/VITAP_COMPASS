import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <div className='main'>
        <h1 className="h1">Hey VITIAN! How can I help you?</h1>
        <div className="chat">
            <textarea name="" id="" className="textarea" placeholder="Type your Query..."></textarea>
            
            <div className="btnss">
              <button className="btn3"><i class="fa-solid fa-microphone-lines"></i></button>
            <button className="btn"><i class="fa-solid fa-arrow-up"></i></button>
            </div>
        </div>
    </div>
  )
}

export default Home