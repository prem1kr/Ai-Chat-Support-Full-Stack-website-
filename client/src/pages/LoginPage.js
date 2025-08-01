import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Auth.css';

const LoginPage = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminLogin = location.pathname === '/admin/login';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      const { token, userId, isAdmin } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', isAdmin); 

      onLogin(userId);

      if (isAdminLogin && isAdmin) {
        navigate('/admin');
      } else if (isAdminLogin && !isAdmin) {
        alert('You are not authorized as admin.');
      } else {
        navigate('/');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h2>{isAdminLogin ? 'Admin Login' : 'Login'}</h2>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Login'}
        </button>
        {!isAdminLogin && (
          <p>Don't have an account? <a href="/signup">Signup</a></p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
