import React, { useState, useEffect, useCallback } from 'react';

const Header = ({ user, onLogout }) => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch('https://paperlesspulse.onrender.com/api/notifications', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const data = await response.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  }, []); 

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  const handleInviteResponse = async (orgId, status) => {
    try {
      const response = await fetch('https://paperlesspulse.onrender.com/api/invite/respond', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` 
        },
        body: JSON.stringify({ orgId, status })
      });
      
      if (response.ok) {
        fetchNotifications();
        alert(`Invitation ${status}!`);
        if (status === 'accepted') {
            window.dispatchEvent(new Event('orgAccepted'));
        }
      }
    } catch (err) {
      console.error("Error responding to invite:", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header style={{display:'flex', justifyContent:'space-between', padding:'1rem 2rem', background:'white', borderBottom:'1px solid #e2e8f0', position: 'relative'}}>
      <div style={{fontSize:'1.5rem', fontWeight:'800'}}>Paperless<span style={{color:'#2563eb'}}>Pulse</span></div>
      
      {user && (
        <div style={{display:'flex', gap:'1.5rem', alignItems:'center'}}>
          
          {/* Notification Bell */}
          <div style={{position: 'relative', cursor: 'pointer'}} onClick={() => setShowDropdown(!showDropdown)}>
            <span style={{fontSize: '1.2rem'}}>🔔</span>
            {unreadCount > 0 && (
              <span style={{position:'absolute', top:'-5px', right:'-5px', background:'#ef4444', color:'white', borderRadius:'50%', padding:'2px 6px', fontSize:'10px'}}>
                {unreadCount}
              </span>
            )}
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div style={{position: 'absolute', top: '100%', right: '2rem', width: '300px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 100, padding: '1rem'}}>
              <h4 style={{margin: '0 0 0.5rem 0'}}>Notifications</h4>
              {notifications.length === 0 ? (
                <p style={{fontSize: '0.875rem', color: '#64748b'}}>No new alerts</p>
              ) : (
                notifications.map((n) => (
                  <div key={n.id} style={{padding: '0.5rem 0', borderBottom: '1px solid #f1f5f9'}}>
                    <p style={{fontSize: '0.875rem', margin: '0 0 0.5rem 0'}}>{n.message}</p>
                    {n.type === 'invite' && (
                      <div style={{display: 'flex', gap: '0.5rem'}}>
                        <button onClick={() => handleInviteResponse(n.sender_id, 'accepted')} style={{background: '#dcfce7', color: '#166534', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem'}}>Accept</button>
                        <button onClick={() => handleInviteResponse(n.sender_id, 'rejected')} style={{background: '#fee2e2', color: '#991b1b', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem'}}>Reject</button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          <span>{user.name}</span>
          <button onClick={onLogout} style={{background:'#fee2e2', color:'#dc2626', border:'none', padding:'0.5rem 1rem', borderRadius:'6px', cursor:'pointer'}}>Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;