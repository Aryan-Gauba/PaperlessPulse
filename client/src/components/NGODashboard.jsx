import React, { useEffect, useState } from 'react';

export default function NGODashboard({ token }) {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/ngo', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setSurveys(data.data || []))
    .catch(err => console.error("Fetch error:", err));
  }, [token]);

  return (
    <div className="dashboard-card">
      <h2>NGO Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-item">Total Surveys: {surveys.length}</div>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map(s => (
            <tr key={s.id}>
              <td>{s.location}</td>
              <td>{s.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}