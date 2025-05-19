import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://vercel-dashboard-jfkd.onrender.com/api/Leadboard')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching leaderboard:', err));
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '40px 20px',
      backgroundColor: '#0f0f1c',
      color: '#f0f0f0',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      textAlign: 'center',
      fontSize: '36px',
      marginBottom: '30px',
      color: '#f7a41d',
      fontWeight: 'bold',
    },
    tableWrapper: {
      overflowX: 'auto',
      backgroundColor: '#1e1e2f',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 0 10px #f7a41d55',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: '1000px',
    },
    th: {
      padding: '12px 15px',
      textAlign: 'center',
      backgroundColor: '#2c2c3e',
      color: '#f7a41d',
      fontWeight: 'bold',
      borderBottom: '2px solid #444',
    },
    td: {
      padding: '12px 15px',
      textAlign: 'center',
      borderBottom: '1px solid #333',
      color: '#f0f0f0',
    },
    rowHover: {
      backgroundColor: '#2d2d3d',
    },
    noUsers: {
      padding: '20px',
      textAlign: 'center',
      color: '#ccc',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🏆 LeetCode Leaderboard</h1>
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>#</th>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Rank</th>
              <th style={styles.th}>Total Solved</th>
              
              <th style={styles.th}>College</th>
              <th style={styles.th}>Year</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Skills</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id} style={index % 2 === 0 ? {} : styles.rowHover}>
                  <td style={styles.td}>{index + 1}</td>
                  <td style={styles.td}>{user.username}</td>
                  <td style={styles.td}>{user.rank}</td>
                  <td style={styles.td}>{user.totalSolved}</td>
                
                  <td style={styles.td}>{user.college || '—'}</td>
                  <td style={styles.td}>{user.year || '—'}</td>
                  <td style={styles.td}>{user.department || '—'}</td>
                  <td style={styles.td}>{(user.skills || []).join(', ') || '—'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" style={styles.noUsers}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
