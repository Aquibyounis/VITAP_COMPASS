import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();  // get current path
  const [sec, setSec] = useState("AI");

  useEffect(() => {
    if (location.pathname === "/compass") {
      setSec("Campus");
    } else {
      setSec("AI");
    }
  }, [location.pathname]); // run whenever the route changes

  return (
    <div className="nav">
      <Link className='logo' to='/'>VIT Compass</Link>
      <ul className={`ol ${sec === "AI" ? "ai-active" : ""}`}>
        <Link 
          className={sec === "Campus" ? 'active' : 'n'} 
          onClick={() => setSec("Campus")} 
          to='/compass'
        >
          Campus
        </Link>
        <Link 
          className={sec === "AI" ? 'active' : 'n'} 
          onClick={() => setSec("AI")} 
          to='/'
        >
          AI
        </Link>
      </ul>
    </div>
  )
}

export default Navbar;
