import React from 'react';

export default function Header({ user, onLogout }) {
  return (
    <header className="header-nav">
      <h1 className="logo">PaperlessPulse</h1>
      {user && (
        <div className="user-controls">
          <span>{user.name}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </header>
  );
}