import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const Sidebar = ({ userId, onSelectChat }) => {
  const [conversations, setConversations] = useState([]);

  const fetchConversations = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/chat/history/${userId}`);
      setConversations(res.data);
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const handleNewChat = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/chat/new', { userId });
      const newChatId = res.data.convoId;

      onSelectChat(newChatId);
      await fetchConversations();
    } catch (err) {
      console.error('Error creating new chat:', err);
    }
  };

  return (
    <div className="sidebar">
      <h2>💬 Chats</h2>
      <button className="new-chat-button" onClick={handleNewChat}>
        ➕ New Chat
      </button>
      <div className="conversation-list">
        {conversations.map((convo) => (
          <div
            key={convo._id}
            className="conversation-item"
            onClick={() => onSelectChat(convo._id)}
          >
            <p className="preview">
              {convo.lastMessage?.slice(0, 40) || 'New conversation...'}
            </p>
            <span className="timestamp">
              {new Date(convo.updatedAt || convo.createdAt || Date.now()).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
