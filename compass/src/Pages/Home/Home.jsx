import React, { useState, useRef, useEffect } from "react";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    alert("This is a temporary chat! Once you go to new chat you can’t return...");
  }, []);

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });
  const [chatStarted, setChatStarted] = useState(messages.length > 0);
  const [botTyping, setBotTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botTyping]);

  // Save messages
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Typing effect (fixed undefined bug)
  const simulateTyping = async (fullText, delay = 25) => {
    return new Promise((resolve) => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < fullText.length) {
          const char = fullText[index];
          if (char !== undefined) {
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              const others = prev.slice(0, -1);
              return [...others, { ...last, text: last.text + char }];
            });
          }
          index++;
        } else {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  };

  // Send message
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
          "X-Clear-Chat": "false",
        },
        body: JSON.stringify({ question: msg }),
      });

      const data = await response.json();
      if (!sessionId && data.session_id)
        localStorage.setItem("sessionId", data.session_id);

      // Add bot placeholder
      setMessages((prev) => [...prev, { sender: "bot", text: "" }]);

      // Clean text fully before typing
      const cleanAnswer = (data.answer || "")
        .replace(/\bundefined\b/gi, "")
        .replace(/\bnull\b/gi, "")
        .replace(/\bNone\b/gi, "")
        .trim();

      await simulateTyping(cleanAnswer, 20);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    } finally {
      setBotTyping(false);
    }
  };

  // Handle Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(query);
    }
  };

  // Clear chat
  const clearChatHandler = async () => {
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
      {/* Pre-chat Section */}
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

      {/* Chat window */}
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

            {/* Typing dots */}
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

      {/* Clear button */}
      <button className="clear-btn">
        <span className="clear-text" onClick={clearChatHandler}>
          clear
        </span>
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
