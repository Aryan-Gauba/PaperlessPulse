import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// This fix is required because React often breaks Leaflet's default marker icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to refocus map when user location is detected
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}

export default function IndividualDashboard() {
  const [view, setView] = useState('resources'); 
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data states
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ totalIssues: 0, totalSurveys: 0 });
  
  const [newReport, setNewReport] = useState({ 
    type: '', 
    location: '', 
    description: '', 
    priority: 'Medium' 
  });

  // 1. Add these new states near your other data states
const [userPos, setUserPos] = useState([28.6139, 77.2090]); // Default to Delhi
const [locationLoaded, setLocationLoaded] = useState(false);

// 2. Update your useEffect to trigger browser geolocation
useEffect(() => {
  fetchDashboardData();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
        setLocationLoaded(true);
      },
      () => console.log("User denied location access.")
    );
  }
}, []);

  const API_BASE = 'https://paperlesspulse.onrender.com/api';

  const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/dashboard/individual`, {
        headers: getAuthHeader()
      });
      
      if (!response.ok) {
         const errorText = await response.text();
         if (errorText.includes('<!DOCTYPE html>')) {
            throw new Error('Backend Server Error: Check terminal for Duplicate Export or Path issues.');
         }
         throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setReports(data.issues || []);
      setStats(data.stats || { totalIssues: 0, totalSurveys: 0 });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/issues`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(newReport)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit report');
      }

      const savedIssue = await response.json();
      
      setReports(prev => [savedIssue, ...prev]);
      setStats(prev => ({ ...prev, totalIssues: (prev.totalIssues || 0) + 1 }));
      
      setShowReportModal(false);
      setNewReport({ type: '', location: '', description: '', priority: 'Medium' });
      setView('my-reports');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

const handleDeleteReport = async (reportId) => {
    if (!window.confirm("Are you sure you want to delete this report? This action cannot be undone.")) return;

    try {
        // Ensure there is only one slash between API_BASE and issues
        const response = await fetch(`${API_BASE}/issues/${reportId}`, {
            method: 'DELETE',
            headers: getAuthHeader()
        });

        if (!response.ok) {
            // This part handles the HTML error page gracefully
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to delete report');
            } else {
                throw new Error('Server returned an HTML error. Check if the DELETE route is correctly defined.');
            }
        }

        setReports(prev => prev.filter(r => r.id !== reportId));
        setStats(prev => ({ ...prev, totalIssues: Math.max(0, (prev.totalIssues || 1) - 1) }));
        
    } catch (err) {
        alert(err.message);
    }
};

  if (error) {
    return (
      <div className="error-container">
        <p>⚠️ System Alert: {error}</p>
        <button className="primary-button-sm" onClick={() => { setError(null); fetchDashboardData(); }}>
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <div className="individual-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Community Support Portal</h2>
          <p className="subtitle">Report issues for immediate NGO attention and track resolution status.</p>
        </div>
        <button className="report-trigger-btn" onClick={() => setShowReportModal(true)}>
          🚨 Report New Issue
        </button>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${view === 'resources' ? 'active' : ''}`}
          onClick={() => setView('resources')}
        >
          Nearby Resources
        </button>
        <button 
          className={`tab-btn ${view === 'my-reports' ? 'active' : ''}`}
          onClick={() => setView('my-reports')}
        >
          My Reported Issues ({stats.totalIssues || 0})
        </button>
      </div>

      {isLoading && <div className="loading-spinner">Syncing with Pulse Network...</div>}

      {view === 'resources' ? (
        <div className="resources-view">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Your Active Reports</span>
              <span className="stat-value">{stats.totalIssues || 0}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Verified NGO Points</span>
              <span className="stat-value">24</span>
            </div>
          </div>

          <div className="content-card">
            <h3>Live Resource Map</h3>
            <div style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginTop: '15px', border: '1px solid #e2e8f0' }}>
              <MapContainer center={userPos} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={userPos}>
                  <Popup>
                    <strong>You are here</strong> <br /> 
                    NGOs within 5km are being prioritized.
                  </Popup>
                </Marker>
                <RecenterMap position={userPos} />
              </MapContainer>
            </div>
          </div>
      </div>
      ) : (
        <div className="reports-view">
          <div className="content-card">
            <h3>Issue Tracking Status</h3>
            <div className="table-container">
              {reports.length === 0 ? (
                <p className="empty-state">No active reports. Use the button above to alert NGOs.</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Ref ID</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map(report => (
                      <tr key={report.id}>
                        <td><code className="ref-code">#{report.id}</code></td>
                        <td><strong>{report.type}</strong></td>
                        <td>{report.location}</td>
                        <td>
                           <span className={`priority-tag ${report.priority?.toLowerCase()}`}>
                            {report.priority}
                           </span>
                        </td>
                        <td>
                          <span className={`status-pill ${(report.status || 'Pending').toLowerCase().replace(' ', '-')}`}>
                            {report.status || 'Pending'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            className="delete-action-btn"
                            onClick={() => handleDeleteReport(report.id)}
                            title="Delete this report"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>Report Field Issue</h3>
              {/* X Button Removed as requested */}
            </div>
            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <label>Issue Category</label>
                <select 
                  className="form-input" required
                  value={newReport.type} onChange={e => setNewReport({...newReport, type: e.target.value})}
                >
                  <option value="">Select Category</option>
                  <option value="Food/Water">Food & Water Shortage</option>
                  <option value="Medical">Medical Emergency</option>
                  <option value="Infrastructure">Structural Damage</option>
                  <option value="Sanitation">Sanitation/Waste</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location Details</label>
                <input 
                  type="text" className="form-input" placeholder="e.g. Near Metro Pillar 140" required
                  value={newReport.location} onChange={e => setNewReport({...newReport, location: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Urgency Level</label>
                <div className="priority-selector">
                  {['Low', 'Medium', 'High', 'Critical'].map(p => (
                    <button 
                      key={p} type="button"
                      className={`p-btn ${newReport.priority === p ? 'active' : ''}`}
                      onClick={() => setNewReport({...newReport, priority: p})}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>Detailed Description</label>
                <textarea 
                  className="form-input" rows="3" placeholder="Describe the current situation..." required
                  value={newReport.description} onChange={e => setNewReport({...newReport, description: e.target.value})}
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowReportModal(false)}>Cancel</button>
                <button type="submit" className="primary-button" disabled={isLoading}>
                  {isLoading ? 'Sending to Pulse...' : 'Submit Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .individual-dashboard { width: 100%; max-width: 1200px; padding: 20px; margin: 0 auto; }
        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
        .subtitle { color: #64748b; margin-top: 4px; }
        .report-trigger-btn { background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .dashboard-tabs { display: flex; gap: 10px; border-bottom: 1px solid #e2e8f0; margin-bottom: 2rem; }
        .tab-btn { background: none; border: none; padding: 12px 24px; font-weight: 600; cursor: pointer; color: #94a3b8; border-bottom: 3px solid transparent; }
        .tab-btn.active { color: #007bff; border-bottom-color: #007bff; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 2rem; }
        .stat-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9; }
        .stat-label { font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; }
        .stat-value { display: block; font-size: 2rem; font-weight: 800; color: #1e293b; }
        .content-card { background: white; padding: 24px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .map-placeholder { width: 100%; height: 350px; background: #f8fafc; border-radius: 12px; border: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; color: #94a3b8; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; padding: 12px; color: #64748b; border-bottom: 2px solid #f1f5f9; }
        .data-table td { padding: 16px 12px; border-bottom: 1px solid #f1f5f9; }
        .ref-code { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-family: monospace; }
        .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-pill.pending { background: #f1f5f9; color: #64748b; }
        .priority-tag { font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; border: 1px solid; }
        .priority-tag.critical { color: #ef4444; }
        .priority-tag.high { color: #f59e0b; }
        .priority-tag.medium { color: #3b82f6; }
        .delete-action-btn { background: none; border: none; font-size: 1.1rem; cursor: pointer; padding: 8px; border-radius: 8px; transition: background 0.2s; }
        .delete-action-btn:hover { background: #fee2e2; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(15, 23, 42, 0.7); display: flex; justify-content: center; align-items: center; z-index: 100; }
        .modal-card { background: white; width: 500px; border-radius: 24px; padding: 32px; }
        .modal-header { margin-bottom: 1.5rem; }
        .priority-selector { display: flex; gap: 8px; margin-top: 8px; }
        .p-btn { flex: 1; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; }
        .p-btn.active { background: #007bff; color: white; border-color: #007bff; }
        .form-group { margin-bottom: 1.2rem; }
        .form-input { width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; margin-top: 5px; }
        .modal-actions { display: flex; gap: 12px; margin-top: 2rem; }
        .primary-button { background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; flex: 1; }
        .secondary-button { background: #f1f5f9; color: #475569; border: none; padding: 12px 24px; border-radius: 12px; cursor: pointer; }
        .loading-spinner { text-align: center; padding: 1rem; color: #007bff; font-weight: 600; }
        .error-container { padding: 40px; text-align: center; background: #fef2f2; color: #b91c1c; border-radius: 12px; margin: 2rem; }
        .stats-grid { 
            display: grid; 
            grid-template-columns: 1fr 1fr; /* Only 2 columns now */
            gap: 20px; 
            margin-bottom: 2rem; 
          }
            /* Update this in your existing <style> block */
        .modal-overlay { 
          position: fixed; 
          inset: 0; 
          background: rgba(15, 23, 42, 0.7); 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          z-index: 9999; /* Increased from 100 to 9999 to sit above Leaflet layers */
        }
      `}</style>
    </div>
  );
}