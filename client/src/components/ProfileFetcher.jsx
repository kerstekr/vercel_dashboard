import React, { useState } from 'react';

function ProfileFetcher() {
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const fetchProfile = async () => {
    setError('');
    setProfile(null);
    try {
      const res = await fetch(`https://vercel-dashboard-jfkd.onrender.com/api/profile/${username}`);
      if (!res.ok) {
        throw new Error('Profile not found or server error');
      }
      const data = await res.json();
      setProfile(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      fetchProfile();
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>LeetCode Profile Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter LeetCode Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>Fetch</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {profile && (
        <div style={{ marginTop: '2rem' }}>
          <h3>{profile.username}</h3>
          <p>Total Solved: {profile.totalSolved}</p>
          <p>Easy: {profile.easy}</p>
          <p>Medium: {profile.medium}</p>
          <p>Hard: {profile.hard}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileFetcher;
