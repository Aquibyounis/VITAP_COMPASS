import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [query, setQuery] = useState("");

  const handleQuestionClick = (question) => {
    setQuery(question);
  };

  return (
    <div className="main">
      <div className="inner_main2">
        <h1 className="h1">Hey VITIAN! How can I help you?</h1>

        {/* Auto-grid Questions */}
        <div className="questions">
          <p onClick={() => handleQuestionClick("I have an idea, how can I start my own startup in college?")}>
            I have an idea, how can I start my own startup in college?
          </p>
          <p onClick={() => handleQuestionClick("I am interested in taking AI as Specialization, I am from Core. How can I?")}>
            I am interested in taking AI as Specialization, I am from Core. How can I?
          </p>
          <p onClick={() => handleQuestionClick("I want to go home but warden didn’t approve my Leave yet. I am in a hurry, what should I do?")}>
            I want to go home but warden didn’t approve my Leave yet. I am in a hurry, what should I do?
          </p>
          <p onClick={() => handleQuestionClick("My parents are visiting my college. Can they stay at Guest bedroom? If yes, how much will one night cost?")}>
            My parents are visiting my college. Can they stay at Guest bedroom? If yes, how much will one night cost?
          </p>
        </div>

      </div>
        {/* Chatbox */}
        <div className="chat">
          <textarea
            className="textarea"
            placeholder="Type your Query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></textarea>
          <div className="btns">
            <button className="btn mic-btn">
              <i className="fa-solid fa-microphone-lines"></i>
            </button>
            <button className="btn send-btn">
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </div>
    </div>
  );
};

export default Home;
