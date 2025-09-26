import React from "react";
import { Link } from "react-router-dom";
import "./Buildings.css";
import { useNavigate  } from "react-router-dom";

const Buildings = () => {
  const navigate = useNavigate(); // <-- hook
  return (
    <div className="parent">
      <div className="card card1">
        <div className="card-content">
          <h3>CB</h3>
        </div>
        <div className="card-hover">
          <button className="ask-btn" onClick={() => navigate("/")}>Ask AI</button>
        </div>
      </div>

      <div className="card card2">
        <div className="card-content">
          <h3>Food Street</h3>
        </div>
        <div className="card-hover">
          <button className="ask-btn" onClick={() => navigate("/")}>Ask AI</button>
        </div>
      </div>

      <div className="card card3">
        <div className="card-content">
          <h3>AB1</h3>
        </div>
        <div className="card-hover">
          <button className="ask-btn" onClick={() => navigate("/")}>Ask AI</button>
        </div>
      </div>

      <div className="card card4">
        <div className="card-content">
          <h3>SAC</h3>
        </div>
        <div className="card-hover">
          <button className="ask-btn" onClick={() => navigate("/")}>Ask AI</button>
        </div>
      </div>

      <div className="card card5">
        <h2>VIT AP</h2>
      </div>

      <div className="card card6">
        <div className="card-content">
          <h3>AB2</h3>
        </div>
        <div className="card-hover">
          <button className="ask-btn" onClick={() => navigate("/")}>Ask AI</button>
        </div>
      </div>

      <div className="card card7">
        <div className="card-content">
          <Link className="website" to="https://vitap.ac.in/">Official Website <i class="fa-solid fa-arrow-up-right-from-square"></i></Link>
        </div>
      </div>
    </div>
  );
};

export default Buildings;
