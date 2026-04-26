import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState('missions');
  
  const [availableTasks, setAvailableTasks] = useState([]);
  const [myTasks, setMyTasks] = useState([]);
  
  const [leaderboard] = useState([
    { rank: 1, name: "Rahul Sharma", xp: "1250 XP", badges: "🥇" },
    { rank: 2, name: "Sanya Iyer", xp: "980 XP", badges: "🥈" },
    { rank: 3, name: "You", xp: "850 XP", badges: "🥉" }
  ]);

  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [myOrgs, setMyOrgs] = useState([]);

  const getToken = useCallback(() => {
    const storedData = localStorage.getItem('user');
    if (!storedData) return "";
    try {
      return JSON.parse(storedData).token;
    } catch (e) {
      return storedData; 
    }
  }, []);

  const acceptTask = async (task) => {
    //  (moves it immediately so the app feels fast)
    setMyTasks([...myTasks, { ...task, progress: 0, status: 'Ongoing', area: task.location }]);
    setAvailableTasks(availableTasks.filter(t => t.id !== task.id));

    try {
      await fetch(`http://localhost:5000/api/tasks/${task.id}/status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}` 
        },
        body: JSON.stringify({ status: 'Ongoing' })
      });
    } catch (err) {
      console.error("Failed to update task status in DB", err);
    }
  }; 

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('document', file); 

    try {
        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            headers : {
              'Authorization': `Bearer ${getToken()}`
            }, 
            body: formData, 
        });

        const data = await response.json();
        
        if (response.ok) {
            alert("File successfully sent to backend! Raw Text: " + data.rawText);
        } else {
            alert("Upload failed: " + data.error);
        }
    } catch (error) {
        console.error("Error sending file:", error);
    } finally {
        setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const fetchMyOrganizations = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/my-organizations', {
        headers: { 'Authorization': `Bearer ${getToken()}` } 
      });
      if(response.ok) {
        const data = await response.json();
        setMyOrgs(data);
      }
    } catch (err) {
      console.error("Error fetching organizations:", err);
    }
  }, [getToken]);

  const fetchAssignedTasks = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        const mappedTasks = data.map(t => ({
          id: t.id,
          title: t.title,
          location: t.area,
          reward: "50 XP",
          urgency: "High", 
          status: t.status
        }));

        const pending = mappedTasks.filter(t => t.status === 'Pending');
        const ongoing = mappedTasks.filter(t => t.status !== 'Pending').map(t => ({
            ...t, area: t.location, progress: 10 
        }));

        setAvailableTasks(pending);
        setMyTasks(ongoing);
      }
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [getToken]);

  useEffect(() => {
    fetchMyOrganizations();
    fetchAssignedTasks(); 
    
    const handleOrgUpdate = () => {
        fetchMyOrganizations();
    };
    
    window.addEventListener('orgAccepted', handleOrgUpdate);
    return () => {
        window.removeEventListener('orgAccepted', handleOrgUpdate);
    };
  }, [fetchMyOrganizations, fetchAssignedTasks]);

  return (
    <div className="volunteer-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Volunteer Field Portal</h2>
          <p className="subtitle">Welcome back! Ready for your next mission?</p>
        </div>
        <div className="quick-actions">
            <input 
                 type="file" 
                 ref={fileInputRef} 
                 onChange={handleFileSelect} 
                 accept="image/*" 
                 style={{ display: 'none' }} 
            />
            <button 
            className="ocr-btn" 
            onClick={triggerFileInput}
            disabled={isUploading}
            >
            {isUploading ? "📷 Uploading..." : "📷 Scan Paper Survey"}
          </button>
          <button className="primary-button">+ New Submission</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Your Contributions</span>
          <span className="stat-value">{myTasks.length}</span> {/* Updated to show real length */}
        </div>
        <div className="stat-card">
          <span className="stat-label">Current Rank</span>
          <span className="stat-value">#3</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Total Impact XP</span>
          <span className="stat-value">850</span>
        </div>
      </div>

      <div className="orgs-container" style={{background: 'white', padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '30px'}}>
        <h3 style={{marginTop: 0, marginBottom: '10px', fontSize: '1.1rem', color: '#1e293b'}}>My Organizations</h3>
        {myOrgs.length === 0 ? (
          <p style={{color: '#64748b', fontSize: '0.9rem', margin: 0}}>You haven't joined any organizations yet. Check the bell icon for invites!</p>
        ) : (
          <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
            {myOrgs.map(org => (
              <span key={org.id} style={{background: '#dbeafe', color: '#1d4ed8', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600'}}>
                🏢 {org.name}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="dashboard-tabs">
        <button className={`tab-link ${activeTab === 'missions' ? 'active' : ''}`} onClick={() => setActiveTab('missions')}>Available Missions</button>
        <button className={`tab-link ${activeTab === 'active' ? 'active' : ''}`} onClick={() => setActiveTab('active')}>Active Tasks</button>
        <button className={`tab-link ${activeTab === 'leaderboard' ? 'active' : ''}`} onClick={() => setActiveTab('leaderboard')}>Leaderboard</button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'missions' && (
          <div className="missions-grid">
            {availableTasks.map(task => (
              <div key={task.id} className="mission-card">
                <div className="card-header">
                  <span className={`urgency-tag ${task.urgency.toLowerCase()}`}>{task.urgency}</span>
                  <span className="xp-tag">{task.reward}</span>
                </div>
                <h3>{task.title}</h3>
                <p>📍 {task.location}</p>
                <button className="accept-btn" onClick={() => acceptTask(task)}>Accept Mission</button>
              </div>
            ))}
            {availableTasks.length === 0 && <p className="empty-msg">No pending missions available.</p>}
          </div>
        )}

        {activeTab === 'active' && (
          <div className="active-tasks-list">
            {myTasks.length > 0 ? myTasks.map(task => (
              <div key={task.id} className="active-task-card">
                <div className="task-main">
                  <h4>{task.title}</h4>
                  <p>📍 {task.area}</p>
                  <div className="progress-container">
                    <div className="progress-bar" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <span className="progress-text">{task.progress}% Completed</span>
                </div>
                <div className="task-actions">
                  <button className="update-btn">Update Progress</button>
                  <button className="submit-btn">Mark as Final</button>
                </div>
              </div>
            )) : <p className="empty-msg">No active tasks. Go to missions to start helping!</p>}
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="leaderboard-container">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Volunteer</th>
                  <th>Points</th>
                  <th>Badges</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map(user => (
                  <tr key={user.rank} className={user.name === 'You' ? 'highlight-row' : ''}>
                    <td>#{user.rank}</td>
                    <td><strong>{user.name}</strong></td>
                    <td>{user.xp}</td>
                    <td>{user.badges}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .volunteer-dashboard { width: 100%; max-width: 1200px; padding: 20px; animation: fadeIn 0.4s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        .dashboard-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 2rem; }
        .subtitle { color: #64748b; margin-top: 5px; }
        .quick-actions { display: flex; gap: 12px; }
        .primary-button { background: #0f172a; color: white; border: none; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; }
        .ocr-btn { background: #e0f2fe; color: #007bff; border: 2px dashed #007bff; padding: 10px 20px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
        .ocr-btn:hover { background: #bae6fd; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: white; padding: 24px; border-radius: 16px; border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .stat-label { font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; }
        .stat-value { font-size: 2.2rem; font-weight: 800; color: #007bff; display: block; }

        .dashboard-tabs { display: flex; gap: 30px; border-bottom: 2px solid #f1f5f9; margin-bottom: 30px; }
        .tab-link { background: none; border: none; padding: 12px 0; font-weight: 600; color: #64748b; cursor: pointer; position: relative; font-size: 1rem; }
        .tab-link.active { color: #007bff; }
        .tab-link.active::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 100%; height: 2px; background: #007bff; }

        /* Missions Grid */
        .missions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
        .mission-card { background: white; padding: 20px; border-radius: 16px; border: 1px solid #e2e8f0; transition: 0.2s; }
        .mission-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
        .urgency-tag { font-size: 0.7rem; font-weight: 800; padding: 2px 10px; border-radius: 20px; text-transform: uppercase; }
        .urgency-tag.high { background: #fee2e2; color: #ef4444; }
        .urgency-tag.medium { background: #fef3c7; color: #d97706; }
        .xp-tag { font-size: 0.8rem; font-weight: 700; color: #10b981; }
        .accept-btn { width: 100%; margin-top: 15px; background: #007bff; color: white; border: none; padding: 10px; border-radius: 8px; font-weight: 600; cursor: pointer; }

        /* Active Tasks */
        .active-tasks-list { display: flex; flex-direction: column; gap: 20px; }
        .active-task-card { background: white; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; }
        .progress-container { width: 100%; max-width: 300px; height: 8px; background: #f1f5f9; border-radius: 10px; margin: 15px 0 5px; }
        .progress-bar { height: 100%; background: #10b981; border-radius: 10px; transition: 0.5s; }
        .progress-text { font-size: 0.8rem; font-weight: 600; color: #64748b; }
        .task-actions { display: flex; gap: 10px; }
        .update-btn { background: #f1f5f9; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .submit-btn { background: #10b981; color: white; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .empty-msg { color: #64748b; font-style: italic; }

        /* Leaderboard */
        .leaderboard-container { background: white; border-radius: 16px; border: 1px solid #e2e8f0; overflow: hidden; }
        .leaderboard-table { width: 100%; border-collapse: collapse; text-align: left; }
        .leaderboard-table th { padding: 15px 20px; background: #f8fafc; color: #64748b; font-size: 0.9rem; }
        .leaderboard-table td { padding: 15px 20px; border-bottom: 1px solid #f1f5f9; }
        .highlight-row { background: #f0f9ff; }
      `}</style>
    </div>
  );
}