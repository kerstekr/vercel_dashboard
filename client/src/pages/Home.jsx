// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';
import Auth from '../components/Auth';

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) fetchAllUsers();
  }, [token]);

  const fetchAllUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleSubmit = async () => {
    setError('');
    if (!username.trim()) return;

    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to add user');
        return;
      }

      setUsername('');
      fetchAllUsers();
    } catch (err) {
      setError('user not found');
    }
  };

  const handleDelete = async (usernameToDelete) => {
    try {
      await fetch(`http://localhost:5000/api/profile/${usernameToDelete}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const handleAddAcademic = async (username) => {
    const college = prompt(`Enter college for ${username}:`);
    const department = prompt(`Enter department for ${username}:`);
    const year = prompt(`Enter year for ${username}:`);
    if (!college || !department || !year) return;

    try {
      const res = await fetch(`http://localhost:5000/api/college/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ college, department, year }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to update academic info');
        return;
      }
      fetchAllUsers();
    } catch (err) {
      setError('Server error: ' + err.message);
    }
  };

  const handleAddSkill = async (username) => {
    const skills = prompt(`Enter skills for ${username} (comma separated):`);
    if (!skills) return;
    const skillArray = skills.split(',').map(s => s.trim()).filter(Boolean);

    try {
      const res = await fetch(`http://localhost:5000/api/skills/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skills: skillArray }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Failed to update skills');
        return;
      }
      fetchAllUsers();
    } catch (err) {
      setError('Server error: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsers([]);
  };

  if (!token) return <Auth onLoginSuccess={setToken} />;

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      backgroundColor: '#0f1923',    // LeetCode dark/navy
      color: '#ffffff',
      fontFamily: 'Segoe UI, Tahoma, sans-serif',
    },
    logoutBtn: {
      float: 'right',
      backgroundColor: '#f68b1e',     // LeetCode orange
      color: '#0f1923',
      border: 'none',
      padding: '8px 14px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
    },
    heading: {
      marginBottom: '1.5rem',
      fontSize: '1.8rem',
      color: '#f68b1e',               // LeetCode orange
    },
    leaderboardBtn: {
      backgroundColor: '#f68b1e',
      color: '#0f1923',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    form: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '1rem',
    },
    input: {
      flex: 1,
      padding: '10px',
      fontSize: '1rem',
      borderRadius: '4px',
      border: '1px solid #303a45',
      backgroundColor: '#15212b',
      color: '#fff',
    },
    addBtn: {
      backgroundColor: '#f68b1e',
      color: '#0f1923',
      border: 'none',
      padding: '10px 16px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: '600',
      boxShadow: '0 2px 6px rgba(246,139,30,0.4)',
    },
    error: {
      color: '#e74c3c',
      marginBottom: '1rem',
    },
    tableContainer: {
      marginTop: '2rem',
      overflowX: 'auto',
    },
  };

  return (
    <div style={styles.container}>
      <button onClick={handleLogout} style={styles.logoutBtn}>
        Logout
      </button>

      <h2 style={styles.heading}>LeetCode Profile Tracker</h2>

      <button
        onClick={() => navigate('/leaderboard')}
        style={styles.leaderboardBtn}
      >
        🏆 View Leaderboard
      </button>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter LeetCode username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.addBtn}>
          Add User
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.tableContainer}>
        <UserTable
          users={users}
          onDelete={handleDelete}
          onAddAcademic={handleAddAcademic}
          onAddSkill={handleAddSkill}
        />
      </div>
    </div>
  );
};

export default Home;
