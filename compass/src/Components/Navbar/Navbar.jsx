import React from 'react'
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
    const [sec,setSec]=useState("AI")
  return (
    <div className="nav">
      <Link className='logo'>VIT Compass</Link>
      <ul className={`ol ${sec === "AI" ? "ai-active" : ""}`}>
        <Link className={sec==="Campus" ? 'active' : 'n'} onClick={() => setSec("Campus")} to='/compass'>Campus</Link>
        <Link className={sec==="AI" ? 'active' : 'n'} onClick={() => setSec("AI")} to='/'>AI</Link>
      </ul>

      <button className='logo2'>Get Started</button>
    </div>
  )
}

export default Navbar