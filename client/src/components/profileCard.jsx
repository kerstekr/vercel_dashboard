import React from "react";
import App from '../App'

function ProfileCard({ profile }) {
  return (
    <div style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}>
      <table style={{ borderCollapse: "collapse", width: "60%", fontSize: "18px" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Total Solved</th>
            <th style={thStyle}>Easy</th>
            <th style={thStyle}>Medium</th>
            <th style={thStyle}>Hard</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>{profile.username}</td>
            <td style={tdStyle}>{profile.totalSolved}</td>
            <td style={tdStyle}>{profile.easy}</td>
            <td style={tdStyle}>{profile.medium}</td>
            <td style={tdStyle}>{profile.hard}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "center",
};

const tdStyle = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "center",
};

export default ProfileCard;
