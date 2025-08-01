import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Auth.css';

const SignupPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ai-chat-support-full-stack-website.onrender.com/api/auth/signup', form);
      alert('Signup successful! Now login.');
      window.location.href = '/login';
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSignup} className="auth-form">
        <h2>Signup</h2>
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
        <button type="submit">Signup</button>
        <p>Already have an account? <a href="/signup">Signup</a></p>
      </form>
    </div>
  );
};

export default SignupPage;
