import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [selectedConvoId, setSelectedConvoId] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, convoRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/admin/conversations', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setUsers(userRes.data);
        setConversations(convoRes.data);
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };

    fetchData();
  }, [token]);

  const fetchMessages = async (convoId) => {
    try {
      setSelectedConvoId(convoId);
      const res = await axios.get(`http://localhost:5000/api/admin/conversations/${convoId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h2>👨‍💼 Admin Dashboard</h2>

      <section>
        <h3>All Users</h3>
        <ul>
          {users.map((u) => (
            <li key={u._id}>{u.email}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>All Conversations</h3>
        <ul>
          {conversations.map((convo) => (
            <li key={convo._id}>
              <strong>ID:</strong> {convo._id}
              <br />
              <strong>Participants:</strong>{' '}
              {convo.participants?.map((p) => p.email || p).join(', ')}
              <br />
              <button onClick={() => fetchMessages(convo._id)}>View Messages</button>
            </li>
          ))}
        </ul>
      </section>

      {selectedMessages.length > 0 && (
        <section>
          <h3>Messages in Conversation {selectedConvoId}</h3>
          <ul>
            {selectedMessages.map((msg) => (
              <li key={msg._id}>
                <strong>{msg.sender?.email || msg.sender}:</strong> {msg.text}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default AdminDashboard;
