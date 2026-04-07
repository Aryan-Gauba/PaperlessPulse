import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NGODashboard from './components/NGODashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [credentials, setCredentials] = useState({ name: '', email: '', role: 'volunteer', password: 'password123' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    
    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      const data = await res.json();

      if (res.ok) {
        // --- ADDED ALERT HERE ---
        if (isRegistering) {
          alert(`Success! Welcome to PaperlessPulse, ${data.name}.`);
        }
        
        setUser(data);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Server connection failed");
    }
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={() => setUser(null)} />
      <main className="main-content">
        {!user ? (
          <div className="auth-card">
            <form onSubmit={handleSubmit}>
              <h2>{isRegistering ? 'Create Account' : 'Portal Login'}</h2>
              {error && <p className="error-text">{error}</p>}

              {isRegistering && (
                <input 
                  type="text" placeholder="Full Name" className="form-input" required
                  onChange={e => setCredentials({...credentials, name: e.target.value})}
                />
              )}

              <label>I am a:</label>
              <select className="form-input" value={credentials.role} onChange={e => setCredentials({...credentials, role: e.target.value})}>
                <option value="ngo">NGO</option>
                <option value="volunteer">Volunteer</option>
                <option value="individual">Individual</option>
              </select>

              <input 
                type="email" placeholder="Email" className="form-input" required
                onChange={e => setCredentials({...credentials, email: e.target.value})}
              />
              
              <button type="submit" className="primary-button">
                {isRegistering ? 'Register' : 'Access Dashboard'}
              </button>

              <p style={{ textAlign: 'center', marginTop: '1rem', cursor: 'pointer', color: '#007bff' }} 
                 onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'New here? Create an account'}
              </p>
            </form>
          </div>
        ) : (
          /* Dashboards remain the same */
          <div className="dashboard-wrapper">
             {user.role === 'ngo' && <NGODashboard token={user.token} />}
             {user.role === 'volunteer' && <VolunteerDashboard />}
             {user.role === 'individual' && <IndividualDashboard />}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}