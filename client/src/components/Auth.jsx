// Auth.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Auth({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (res.ok) {
        if (username !== 'admin') {
          setMessage('Only admin can login!');
          return;
        }
        // store token
        localStorage.setItem('token', data.token);
        onLoginSuccess(data.token);

        // redirect to home
        navigate('/', { replace: true });
      } else {
        setMessage(data.message || ' Login failed');
      }
    } catch (err) {
      setMessage(' Error: ' + err.message);
    }
  };

  return (
    <div style={{
      maxWidth: '400px', margin: '50px auto', padding: '30px',
      borderRadius: '12px', background: '#f7f9fc',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif',
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>🔐 Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{
          display: 'block', marginBottom: '15px', padding: '10px',
          width: '100%', borderRadius: '8px', border: '1px solid #ccc',
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{
          display: 'block', marginBottom: '20px', padding: '10px',
          width: '100%', borderRadius: '8px', border: '1px solid #ccc',
        }}
      />
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleLogin}
          style={{
            padding: '10px 20px', borderRadius: '8px',
            border: 'none', backgroundColor: '#28a745',
            color: 'white', cursor: 'pointer',
          }}
        >
          Login
        </button>
      </div>
      <p style={{
        marginTop: '20px', color: '#555',
        fontWeight: 'bold', textAlign: 'center',
      }}>
        {message}
      </p>
    </div>
  );
}
