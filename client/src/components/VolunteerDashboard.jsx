import React, { useState, useRef } from 'react';

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState('missions');
  const [availableTasks, setAvailableTasks] = useState([
    { id: 1, title: "Survey: Flood Relief Impact", location: "Okhla", reward: "50 XP", urgency: "High" },
    { id: 2, title: "Medical Supply Inventory", location: "Rohini", reward: "30 XP", urgency: "Medium" },
  ]);
  const [myTasks, setMyTasks] = useState([
    { id: 101, title: "Ration Distribution", area: "Dwarka", progress: 65, status: "Ongoing" }
  ]);
  const [leaderboard] = useState([
    { rank: 1, name: "Rahul Sharma", xp: "1250 XP", badges: "🥇" },
    { rank: 2, name: "Sanya Iyer", xp: "980 XP", badges: "🥈" },
    { rank: 3, name: "You", xp: "850 XP", badges: "🥉" }
  ]);

  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const acceptTask = (task) => {
    setMyTasks([...myTasks, { ...task, progress: 0, status: 'Ongoing', area: task.location }]);
    setAvailableTasks(availableTasks.filter(t => t.id !== task.id));
  }; 
  
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('document', file); 

    try {
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:5000/api/upload', {
            method: 'POST',
            headers : {
              'Authorization': `Bearer ${token}`
            }, 
            body: formData, //fetch will automatically set the content-header
        });

        const data = await response.json();
        console.log("Server Response:", data);
        
        if (response.ok) {
            alert("File successfully sent to backend!");
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

  return (
    <div className="volunteer-dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Volunteer Field Portal</h2>
          <p className="subtitle">Welcome back, Volunteer1. Ready for your next mission?</p>
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

      {/* Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Your Contributions</span>
          <span className="stat-value">12</span>
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