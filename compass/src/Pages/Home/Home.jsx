import React, { useState, useRef, useEffect } from "react";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    alert("This is a temporary chat! Once you go to new chat you cant return...");
  }, []);

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(() => {
    // Load messages from localStorage
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [chatStarted, setChatStarted] = useState(messages.length > 0);
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Send message handler
  const sendMessage = async (msg) => {
    if (!msg.trim()) return;

    setChatStarted(true);
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setQuery("");
    setBotTyping(true);

    try {
      const sessionId = localStorage.getItem("sessionId") || null;

      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
          "X-Clear-Chat": "false", // Always false for normal queries
        },
        body: JSON.stringify({ question: msg }),
      });

      const data = await response.json();

      // Save session ID if new
      if (!sessionId) localStorage.setItem("sessionId", data.session_id);

      setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error connecting to server." },
      ]);
    } finally {
      setBotTyping(false);
    }
  };

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(query);
    }
  };
  // Clear chat function
  const clearChatHandler = async () => {
    // Clear local storage
    localStorage.removeItem("chatMessages");
    const sessionId = localStorage.getItem("sessionId") || null;
    if (sessionId) {
      await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Session-ID": sessionId,
          "X-Clear-Chat": "true",
        },
        body: JSON.stringify({ question: "" }),
      });
    }
    localStorage.removeItem("sessionId");
    setMessages([]);
    setChatStarted(false);
  };



  return (
    <div className="main">
      {/* Questions grid */}
      {!chatStarted && (
        <div className="inner_main2">
          <h1 className="h1">Hey VITIAN! How can I help you?</h1>
          <div className="questions">
            <p onClick={() => sendMessage("I have an idea, how can I start my own startup in college?")}>
              I have an idea, how can I start my own startup in college?
            </p>
            <p onClick={() => sendMessage("I am interested in taking AI as Specialization, I am from Core. How can I?")}>
              I am interested in taking AI as Specialization, I am from Core. How can I?
            </p>
            <p onClick={() => sendMessage("I want to go home but warden didn’t approve my Leave yet. I am in a hurry, what should I do?")}>
              I want to go home but warden didn’t approve my Leave yet. I am in a hurry, what should I do?
            </p>
            <p onClick={() => sendMessage("My parents are visiting my college. Can they stay at Guest bedroom? If yes, how much will one night cost?")}>
              My parents are visiting my college. Can they stay at Guest bedroom? If yes, how much will one night cost?
            </p>
          </div>
        </div>
      )}

      {/* Chat messages */}
      {chatStarted && (
        <div className="inner_main2">
          <div className="chat_messages">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`message ${msg.sender}`} 
                style={{ whiteSpace: "pre-line", textAlign: "left" }}
              >
                {msg.text}
              </div>

            ))}

            {/* Typing animation */}
            {botTyping && (
              <div className="message bot">
                <div className="bot_typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}

      <button className="clear-btn">
        <span className="clear-text"
          onClick={clearChatHandler}>clear</span>
        C
      </button>


      {/* Chat input */}
      <div className="chat">
        <textarea
          className="textarea"
          placeholder="Type your Query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="btns">
          <button className="btn send-btn" onClick={() => sendMessage(query)}>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
