import React from 'react';

export default function VolunteerDashboard() {
  return (
    <div className="dashboard-card">
      <h2>Volunteer Portal</h2>
      <p>Scan paper surveys or enter data manually.</p>
      <div className="action-buttons">
        <button className="primary-button">New Submission</button>
        <button className="secondary-button">Upload Image (OCR)</button>
      </div>
    </div>
  );
}