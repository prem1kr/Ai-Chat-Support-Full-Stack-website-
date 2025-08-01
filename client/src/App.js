import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard'; 
import './App.css';

const MainApp = ({ userId, setUserId }) => {
  const [selectedConvoId, setSelectedConvoId] = useState(null);

  const logout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
    <div className="app-container">
      <Sidebar userId={userId} onSelectChat={setSelectedConvoId} />
      <ChatWindow userId={userId} convoId={selectedConvoId} />
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

function App() {
  const [userId, setUserId] = useState(() => localStorage.getItem('userId'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUserId} />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/login" element={<LoginPage onLogin={setUserId} />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/"
          element={
            userId ? (
              <MainApp userId={userId} setUserId={setUserId} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="*" element={<Navigate to={userId ? '/' : '/login'} />} />
      </Routes>
    </Router>
  );
}

export default App;
