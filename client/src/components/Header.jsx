import React from 'react';

const Header = ({ user, onLogout }) => (
  <header style={{display:'flex', justifyContent:'space-between', padding:'1rem 2rem', background:'white', borderBottom:'1px solid #e2e8f0'}}>
    <div style={{fontSize:'1.5rem', fontWeight:'800'}}>Paperless<span style={{color:'#2563eb'}}>Pulse</span></div>
    {user && (
      <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
        <span>{user.name}</span>
        <button onClick={onLogout} style={{background:'#fee2e2', color:'#dc2626', border:'none', padding:'0.5rem 1rem', borderRadius:'6px', cursor:'pointer'}}>Logout</button>
      </div>
    )}
  </header>
);

export default Header