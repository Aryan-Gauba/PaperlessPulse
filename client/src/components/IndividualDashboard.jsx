import React, { useState, useEffect } from 'react';

export default function IndividualDashboard() {
  const [view, setView] = useState('resources'); // 'resources' or 'my-reports'
  const [showReportModal, setShowReportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Data states from Backend
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ totalIssues: 0, totalSurveys: 0 });
  
  const [newReport, setNewReport] = useState({ 
    type: '', 
    location: '', 
    description: '', 
    priority: 'Medium' 
  });

  // API Configuration
  const API_BASE = 'http://localhost:5000/api';
  const getAuthHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/dashboard/individual`, {
        headers: getAuthHeader()
      });
      
      if (!response.ok) throw new Error('Failed to fetch dashboard data');
      
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
      
      // Update local state
      setReports([savedIssue, ...reports]);
      setStats(prev => ({ ...prev, totalIssues: prev.totalIssues + 1 }));
      
      // UI Reset
      setShowReportModal(false);
      setNewReport({ type: '', location: '', description: '', priority: 'Medium' });
      setView('my-reports');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="error-container">
        <p>⚠️ Error: {error}</p>
        <button onClick={() => { setError(null); fetchDashboardData(); }}>Retry</button>
      </div>
    );
  }

  return (
    <div className="individual-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Community Support Portal</h2>
          <p className="subtitle">Access resources or report field issues for immediate NGO attention.</p>
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
          My Reported Issues ({stats.totalIssues})
        </button>
      </div>

      {isLoading && <div className="loading-spinner">Processing pulse data...</div>}

      {view === 'resources' ? (
        <div className="resources-view">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Your Active Reports</span>
              <span className="stat-value">{stats.totalIssues}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Verified NGO Points</span>
              <span className="stat-value">24</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Medical Vans Nearby</span>
              <span className="stat-value">03</span>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header-flex">
              <h3>Live Resource Map</h3>
              <button className="primary-button-sm">View Full Map</button>
            </div>
            <div className="map-placeholder">
              <div className="map-overlay-text">Interactive Resource Map Loading...</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="reports-view">
          <div className="content-card">
            <h3>Issue Tracking Status</h3>
            <div className="table-container">
              {reports.length === 0 ? (
                <p className="empty-state">No issues reported yet. Your contributions help the community.</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Priority</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map(report => (
                      <tr key={report.id}>
                        <td><code className="ref-code">#{report.id.toString().slice(-4)}</code></td>
                        <td><strong>{report.type}</strong></td>
                        <td>{report.location}</td>
                        <td>
                           <span className={`priority-tag ${report.priority?.toLowerCase()}`}>
                            {report.priority}
                           </span>
                        </td>
                        <td>
                          <span className={`status-pill ${report.status?.toLowerCase().replace(' ', '-')}`}>
                            {report.status}
                          </span>
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
              <button className="close-btn" onClick={() => setShowReportModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleReportSubmit}>
              <div className="form-group">
                <label>Issue Type</label>
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
                <label>Exact Location</label>
                <input 
                  type="text" className="form-input" placeholder="e.g. Near Metro Pillar 140, Okhla" required
                  value={newReport.location} onChange={e => setNewReport({...newReport, location: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Priority Level</label>
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
                <label>Description</label>
                <textarea 
                  className="form-input" rows="3" placeholder="Describe the situation briefly..." required
                  value={newReport.description} onChange={e => setNewReport({...newReport, description: e.target.value})}
                ></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowReportModal(false)}>Cancel</button>
                <button type="submit" className="primary-button" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit to Pulse Network'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .individual-dashboard { width: 100%; max-width: 1200px; padding: 20px; animation: fadeIn 0.4s ease-out; margin: 0 auto; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
        .subtitle { color: #64748b; font-size: 1rem; margin-top: 4px; }
        
        .report-trigger-btn { background: #ef4444; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.3); }
        .report-trigger-btn:hover { background: #dc2626; transform: scale(1.02); }

        .dashboard-tabs { display: flex; gap: 10px; border-bottom: 1px solid #e2e8f0; margin-bottom: 2rem; }
        .tab-btn { background: none; border: none; padding: 12px 24px; font-weight: 600; cursor: pointer; color: #94a3b8; border-bottom: 3px solid transparent; transition: 0.2s; }
        .tab-btn.active { color: #007bff; border-bottom-color: #007bff; }

        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 2rem; }
        .stat-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .stat-label { display: block; font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 8px; }
        .stat-value { font-size: 2rem; font-weight: 800; color: #1e293b; }

        .content-card { background: white; padding: 24px; border-radius: 20px; border: 1px solid #f1f5f9; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.05); }
        .card-header-flex { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        
        .map-placeholder { width: 100%; height: 400px; background: #f8fafc; border-radius: 12px; border: 2px dashed #cbd5e1; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 600; }

        .data-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
        .data-table th { text-align: left; padding: 12px; color: #64748b; border-bottom: 2px solid #f1f5f9; font-size: 0.9rem; }
        .data-table td { padding: 16px 12px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
        
        .ref-code { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-weight: 600; color: #475569; }
        .status-pill { padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        .status-pill.resolved { background: #dcfce7; color: #15803d; }
        .status-pill.in-review { background: #fef3c7; color: #b45309; }
        .status-pill.pending { background: #f1f5f9; color: #64748b; }

        .priority-tag { font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase; }
        .priority-tag.critical { color: #ef4444; border: 1px solid #ef4444; }
        .priority-tag.high { color: #f59e0b; border: 1px solid #f59e0b; }
        .priority-tag.medium { color: #3b82f6; border: 1px solid #3b82f6; }

        .priority-selector { display: flex; gap: 8px; margin-top: 8px; }
        .p-btn { flex: 1; padding: 8px; border: 1px solid #e2e8f0; border-radius: 8px; background: white; cursor: pointer; font-size: 0.8rem; font-weight: 600; }
        .p-btn.active { background: #007bff; color: white; border-color: #007bff; }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 2000; }
        .modal-card { background: white; width: 500px; max-width: 95%; border-radius: 24px; padding: 32px; max-height: 90vh; overflow-y: auto; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .close-btn { background: none; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; }
        
        .form-group { margin-bottom: 1.25rem; }
        .form-group label { display: block; font-weight: 600; color: #1e293b; margin-bottom: 6px; font-size: 0.9rem; }
        .form-input { width: 100%; padding: 12px; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 1rem; transition: 0.2s; }
        .form-input:focus { outline: none; border-color: #007bff; box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1); }
        
        .modal-actions { display: flex; gap: 12px; margin-top: 2rem; }
        .primary-button { background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; flex: 1; }
        .primary-button:disabled { background: #94a3b8; cursor: not-allowed; }
        .secondary-button { background: #f1f5f9; color: #475569; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer; }
        
        .loading-spinner { text-align: center; color: #007bff; font-weight: 600; margin: 1rem 0; padding: 1rem; background: #ebf5ff; border-radius: 10px; }
        .error-container { padding: 20px; text-align: center; background: #fef2f2; color: #b91c1c; border-radius: 12px; margin: 2rem; }
        .empty-state { text-align: center; color: #94a3b8; padding: 3rem 0; font-style: italic; }
      `}</style>
    </div>
  );
}