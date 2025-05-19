import React from 'react';

const Header = () => (
  <header
    style={{
      padding: '1rem',
      backgroundColor: '#FFA116',   // LeetCode orange
      color: '#fff',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    }}
  >
    <h1 style={{ margin: 0, fontFamily: 'Segoe UI, sans-serif' }}>
      LeetCode Dashboard
    </h1>
  </header>
);

export default Header;
