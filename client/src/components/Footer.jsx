import React from 'react';

export default function Footer() {
  return (
    <footer className="app-footer" style={{textAlign:'center', padding:'2rem', color:'#64748b', fontSize:'0.875rem'}}>
      <p>© {new Date().getFullYear()} Resource Allocation Project | Hackathon Edition</p>
    </footer>
  );
}