import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ users = [], onDelete, onAddAcademic, onAddSkill }) => {
  const navigate = useNavigate();

  const handleView = (username) => {
    navigate(`/user/${username}`);
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>College</th>
            <th style={styles.th}>Year</th>
            <th style={styles.th}>Rank</th>
            <th style={styles.th}>Total Solved</th>
            <th style={styles.th}>Skills</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username} style={styles.tr}>
              <td style={styles.td}>{user.username}</td>
              <td style={styles.td}>{user.college || <i style={{ color: '#bbb' }}>Not set</i>}</td>
              <td style={styles.td}>{user.year || <i style={{ color: '#bbb' }}>Not set</i>}</td>
              <td style={styles.td}>{user.rank || '-'}</td>
              <td style={styles.td}>{user.totalSolved || 0}</td>
              <td style={styles.td}>
                {user.skills && user.skills.length > 0
                  ? user.skills.join(', ')
                  : <i style={{ color: '#bbb' }}>None</i>}
              </td>
              <td style={styles.td}>
                <div style={styles.actionsContainer}>
                  <button onClick={() => handleView(user.username)} style={styles.viewBtn}>
                    View
                  </button>
                  <button onClick={() => onAddAcademic(user.username)} style={styles.academicBtn}>
                    Add Academic
                  </button>
                  <button onClick={() => onAddSkill(user.username)} style={styles.skillBtn}>
                    Add Skill
                  </button>
                  <button onClick={() => onDelete(user.username)} style={styles.deleteBtn}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(135deg, #232931, #1c2541)',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
    overflowX: 'auto',
    color: 'white',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    color: 'white',
  },
  th: {
    backgroundColor: '#393e46',
    padding: '12px',
    textAlign: 'center',
    fontSize: '1rem',
    color: '#f8c146',
    borderBottom: '2px solid #f8c146',
  },
  tr: {
    borderBottom: '1px solid #444',
  },
  td: {
    padding: '10px',
    fontSize: '0.95rem',
    textAlign: 'center',
    borderBottom: '1px solid #2f3640',
  },
  actionsContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '6px',
  },
  viewBtn: {
    backgroundColor: '#f7941e',
    color: '#1e272e',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(247, 148, 30, 0.4)',
  },
  academicBtn: {
    backgroundColor: '#00cec9',
    color: '#1e272e',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 206, 201, 0.4)',
  },
  skillBtn: {
    backgroundColor: '#81ecec',
    color: '#1e272e',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(129, 236, 236, 0.4)',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '20px',
    fontWeight: '600',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(231, 76, 60, 0.4)',
  },
};

export default UserTable;
