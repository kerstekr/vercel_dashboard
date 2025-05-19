import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`https://vercel-dashboard-jfkd.onrender.com/api/profile/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          setError('Failed to fetch user details');
          return;
        }

        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError('Error fetching user: ' + err.message);
      }
    };

    fetchUser();
  }, [username]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p style={{ color: '#fff', textAlign: 'center' }}>Loading user details...</p>;

  const maxProblems = 3549;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (user.totalSolved / maxProblems) * circumference;

  const leetcodeColors = {
    easy: '#00B8A3',      
    medium: '#FFC01E',    
    hard: '#EF4743',     
    accent: '#FFA116',    
    bgDark: '#0f1624',    
    cardDark: '#1a1a2e',  // darker card
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: leetcodeColors.bgDark,
        padding: '2rem 1rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button
        onClick={() => navigate('/')}
        style={{
          alignSelf: 'flex-start',
          marginBottom: '1.5rem',
          backgroundColor: leetcodeColors.accent,
          color: '#000',
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '20px',
          fontWeight: '600',
          boxShadow: '0 4px 12px rgba(255, 161, 22, 0.4)',
        }}
      >
        &larr; Back
      </button>

      <h2 style={{ marginBottom: '1.5rem', fontWeight: '700', fontSize: '2rem' }}>
        Profile: {user.username}
      </h2>

      <div
        style={{
          backgroundColor: leetcodeColors.cardDark,
          borderRadius: '16px',
          padding: '2rem',
          maxWidth: '480px',
          width: '100%',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          textAlign: 'center',
        }}
      >
        <svg width="180" height="180" style={{ margin: 'auto', display: 'block' }}>
          <circle
            stroke="#444"
            fill="transparent"
            strokeWidth="14"
            r={radius}
            cx="90"
            cy="90"
          />
          <circle
            stroke={leetcodeColors.accent}
            fill="transparent"
            strokeWidth="14"
            r={radius}
            cx="90"
            cy="90"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
          />
        </svg>

        <p style={{ fontSize: '1.2rem', fontWeight: '700', color: leetcodeColors.accent, marginTop: '1rem' }}>
          Solved <span style={{ fontWeight: '900' }}>{user.totalSolved}</span> of{' '}
          <span style={{ fontWeight: '900' }}>{maxProblems}</span> problems
        </p>

        <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>
          <strong>Rank:</strong> {user.rank || 'N/A'}
        </p>

        <p style={{ marginTop: '1rem', fontWeight: '600' }}>By Difficulty:</p>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.5rem' }}>
          <li style={{ color: leetcodeColors.easy }}>Easy: {user.easy ?? 0}</li>
          <li style={{ color: leetcodeColors.medium }}>Medium: {user.medium ?? 0}</li>
          <li style={{ color: leetcodeColors.hard }}>Hard: {user.hard ?? 0}</li>
        </ul>

        <p style={{ marginTop: '1.2rem' }}>
          <strong>College:</strong> {user.college || 'N/A'}<br />
          <strong>Department:</strong> {user.department || 'N/A'}<br />
          <strong>Year:</strong> {user.year || 'N/A'}
        </p>

        <div style={{ marginTop: '1.5rem' }}>
          <p style={{ fontWeight: '600' }}>Skills:</p>
          {Array.isArray(user.skills) && user.skills.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {user.skills.map((skill, idx) => {
                const skillText =
                  typeof skill === 'string'
                    ? skill
                    : `${skill.skillName}: ${skill.problemsSolved} solved`;

                return (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: leetcodeColors.accent,
                      color: '#000',
                      padding: '6px 12px',
                      borderRadius: '18px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                    }}
                  >
                    {skillText}
                  </span>
                );
              })}
            </div>
          ) : (
            <p style={{ color: '#888' }}>No skills added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
