import React, { useEffect, useState } from 'react';
import MainLayout from "./layout/MainLayout";
import Dashboard from "./Pages/Dashboard";
import Issues from "./Pages/Issues";
import Tasks from "./Pages/Tasks";
import Volunteers from "./Pages/Volunteers";
import Leaderboard from "./Pages/Leaderboard";

export default function NGODashboard({ token }) {
  
  const [view, setView] = useState('management'); // 'management' or 'surveys'
  const [surveys, setSurveys] = useState([]);
  const [volunteers] = useState([
    { id: 1, name: "Rahul Sharma", status: "Active" },
    { id: 2, name: "Sanya Iyer", status: "In Field" },
    { id: 3, name: "Amit Verma", status: "Available" }
  ]);
  const [tasks, setTasks] = useState([
    { id: 101, title: "Ration Distribution", area: "Okhla", assigned: "Rahul Sharma", status: "Ongoing" },
    { id: 102, title: "Medical kit delivery", area: "Rohini Sector 7", assigned: "Rahul Sharma", status: "Pending" }
  ]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', area: '', assigned: '' });

  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/ngo', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setSurveys(data.data || []))
      .catch(err => console.error("Fetch error:", err));
  }, [token]);

  const handleCreateTask = (e) => {
    e.preventDefault();
    setTasks([...tasks, { ...newTask, id: Date.now(), status: 'Pending' }]);
    setNewTask({ title: '', area: '', assigned: '' });
    setShowTaskModal(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  return (
    <div className="ngo-dashboard">
      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${view === 'management' ? 'active' : ''}`}
          onClick={() => setView('management')}
        >
          Strategic Command
        </button>
        <button
          className={`tab-btn ${view === 'surveys' ? 'active' : ''}`}
          onClick={() => setView('surveys')}
        >
          Latest Paper Surveys
        </button>
      </div>

      {view === 'management' ? (
        <>
          <div className="dashboard-header">
            <div>
              <h2>NGO Strategic Command</h2>
              <p className="subtitle">Oversee resource allocation and field operations</p>
            </div>
            <button className="primary-button" onClick={() => setShowTaskModal(true)}>+ Create New Task</button>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Reported Issues</span>
              <span className="stat-value">{surveys.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Active Volunteers</span>
              <span className="stat-value">{volunteers.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Tasks Active</span>
              <span className="stat-value">{tasks.length}</span>
            </div>
          </div>

          <div className="dashboard-content">
            {/* Issues List */}
            <div className="content-section">
              <div className="section-header">
                <h3>Live Field Reports</h3>
                <button className="view-all-link" onClick={() => setView('surveys')}>View All Surveys →</button>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {surveys.length > 0 ? surveys.map(s => (
                      <tr key={s.id}>
                        <td><strong>{s.location}</strong></td>
                        <td>{s.description}</td>
                        <td><span className="badge critical">High</span></td>
                        <td><button className="text-btn" onClick={() => {
                          setNewTask({ ...newTask, area: s.location, title: s.description });
                          setShowTaskModal(true);
                        }}>Assign</button></td>
                      </tr>
                    )) : (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>No active field issues reported currently.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Assignments with DELETE functionality */}
            <div className="content-section">
              <h3>Active Assignments</h3>
              <div className="task-list">
                {tasks.length > 0 ? tasks.map(task => (
                  <div className="task-item" key={task.id}>
                    <div className="task-info">
                      <h4>{task.title}</h4>
                      <p>📍 {task.area} | 👤 {task.assigned}</p>
                      <span className={`status-tag ${task.status.toLowerCase().replace(' ', '-')}`}>
                        {task.status}
                      </span>
                    </div>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task.id)}
                      title="Remove Assignment"
                    >
                      🗑️
                    </button>
                  </div>
                )) : (
                  <p className="empty-msg">No tasks assigned yet.</p>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="surveys-archive">
          <div className="section-header">
            <h2>Paper Survey Archive</h2>
            <button className="secondary-button" onClick={() => setView('management')}>Back to Dashboard</button>
          </div>
          <div className="archive-grid">
            {surveys.length > 0 ? surveys.map(s => (
              <div className="survey-card" key={s.id}>
                <div className="card-top">
                  <span className="date-tag">{new Date().toLocaleDateString()}</span>
                  <span className="id-tag">ID: {s.id}</span>
                </div>
                <h4>{s.location}</h4>
                <p>{s.description}</p>
                <div className="card-footer">
                  <span className="source-tag">Digital Scan</span>
                  <button className="primary-button-sm" onClick={() => {
                    setNewTask({ ...newTask, area: s.location, title: s.description });
                    setView('management');
                    setShowTaskModal(true);
                  }}>Create Task</button>
                </div>
              </div>
            )) : (
              <div className="empty-state">
                <p>No scanned surveys found in the database.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Create Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Assign New Field Task</h3>
            <form onSubmit={handleCreateTask}>
              <div className="input-group">
                <label>Task Title</label>
                <input
                  type="text" className="form-input" placeholder="e.g. Medical Kit Delivery" required
                  value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Location/Area</label>
                <input
                  type="text" className="form-input" placeholder="e.g. Rohini Sector 7" required
                  value={newTask.area} onChange={e => setNewTask({ ...newTask, area: e.target.value })}
                />
              </div>
              <div className="input-group">
                <label>Assign Volunteer</label>
                <select
                  className="form-input" required
                  value={newTask.assigned} onChange={e => setNewTask({ ...newTask, assigned: e.target.value })}
                >
                  <option value="">Select a volunteer</option>
                  {volunteers.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                </select>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-button" onClick={() => setShowTaskModal(false)}>Cancel</button>
                <button type="submit" className="primary-button">Confirm Assignment</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .ngo-dashboard { width: 100%; max-width: 1200px; padding: 20px; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        .dashboard-tabs { display: flex; gap: 10px; margin-bottom: 2rem; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
        .tab-btn { background: none; border: none; padding: 10px 20px; font-weight: 600; cursor: pointer; color: #64748b; border-radius: 8px; transition: 0.2s; }
        .tab-btn.active { background: #e0f2fe; color: #007bff; }

        .dashboard-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem; }
        .subtitle { color: #64748b; margin-top: 4px; }
        
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
        .stat-label { font-size: 0.85rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .stat-value { font-size: 2.5rem; font-weight: 800; color: #007bff; display: block; margin-top: 5px; }
        
        .dashboard-content { display: grid; grid-template-columns: 1.8fr 1.2fr; gap: 30px; }
        .content-section { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; }
        
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .view-all-link { background: none; border: none; color: #007bff; font-weight: 600; cursor: pointer; font-size: 0.9rem; }
        
        .task-list { display: flex; flex-direction: column; gap: 15px; }
        .task-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border: 1px solid #f1f5f9; border-radius: 12px; transition: 0.2s; }
        .task-item:hover { border-color: #cbd5e1; }
        .task-info h4 { margin: 0; font-size: 1.05rem; color: #1e293b; }
        .task-info p { margin: 6px 0 10px; font-size: 0.9rem; color: #64748b; }
        
        .delete-btn { background: #fee2e2; border: none; padding: 10px; border-radius: 8px; cursor: pointer; filter: grayscale(1); transition: 0.2s; }
        .delete-btn:hover { filter: grayscale(0); background: #fecaca; transform: scale(1.1); }

        .status-tag { font-size: 0.75rem; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; }
        .status-tag.ongoing { background: #e0f2fe; color: #0ea5e9; }
        .status-tag.pending { background: #fef3c7; color: #d97706; }

        /* Survey Archive View */
        .archive-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }
        .survey-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .card-top { display: flex; justify-content: space-between; margin-bottom: 15px; }
        .date-tag { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
        .id-tag { font-size: 0.75rem; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; color: #475569; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid #f1f5f9; }
        .source-tag { font-size: 0.75rem; font-weight: 600; color: #10b981; }
        .primary-button-sm { background: #007bff; color: white; border: none; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }

        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); display: flex; justify-content: center; align-items: center; z-index: 1000; }
        .modal-card { background: white; padding: 32px; border-radius: 24px; width: 440px; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); }
        .modal-actions { display: flex; gap: 12px; margin-top: 24px; }
      `}</style>
    </div>
  );
}