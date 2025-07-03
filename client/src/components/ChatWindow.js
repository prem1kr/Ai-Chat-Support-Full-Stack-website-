import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = ({ userId, convoId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!convoId) {
      setMessages([]);
      return;
    }

    axios
      .get(`http://localhost:5000/api/chat/${convoId}`)
      .then((res) => setMessages(res.data))
      .catch((err) => {
        console.error('Failed to load messages:', err);
        setMessages([]);
      });
  }, [convoId]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || !convoId) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', {
        userId,
        convoId,
        message: input,
      });

      const botMessage = { sender: 'bot', text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error('Failed to send message:', err);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Something went wrong.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-window">
      {!convoId ? (
        <div className="welcome-message">
          <h1>Hi, I am AI Chat Support 🤖</h1>
        </div>
      ) : (
        <>
          <div className="messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`bubble-wrapper ${msg.sender === 'user' ? 'right' : 'left'}`}
              >
                <div className={`bubble ${msg.sender}`}>{msg.text}</div>
              </div>
            ))}
            {loading && (
              <div className="bubble-wrapper left">
                <div className="bubble bot">Typing...</div>
              </div>
            )}
            <div ref={ref} />
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
