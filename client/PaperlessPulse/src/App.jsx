import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NGODashboard from './components/NGODashboard';
import VolunteerDashboard from './components/VolunteerDashboard';
import IndividualDashboard from './components/IndividualDashboard';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false); // Toggle between Landing and Auth
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
        if (isRegistering) {
          alert(`Success! Welcome to PaperlessPulse, ${data.name}.`);
        }
        setUser(data);
        localStorage.setItem('token', data.token);
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running?");
    }
  };

  const logout = () => {
    setUser(null);
    setShowAuth(false);
    localStorage.removeItem('token');
  };

  // --- SUB-COMPONENTS FOR LANDING PAGE ---
  const LandingPage = () => (
    <div className="landing-container">
      <section className="hero">
        <h1>Paper Surveys to <span className="highlight">Digital Impact</span></h1>
        <p>PaperlessPulse bridges the gap in resource allocation by digitizing field data in real-time using AI-powered OCR.</p>
        <div className="hero-btns">
          <button className="primary-button" onClick={() => setShowAuth(true)}>Get Started</button>
          <button className="secondary-button-outline">Watch Demo</button>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="icon">📄</div>
          <h3>OCR Digitization</h3>
          <p>Instantly convert handwritten field surveys into digital database records.</p>
        </div>
        <div className="feature-card">
          <div className="icon">🤝</div>
          <h3>NGO Coordination</h3>
          <p>Centralized dashboard for organizations to verify and act on field data.</p>
        </div>
        <div className="feature-card">
          <div className="icon">📍</div>
          <h3>Local Support</h3>
          <p>Individuals can find resources and distribution points near them instantly.</p>
        </div>
      </section>
    </div>
  );

  return (
    <div className="app-container">
      <Header user={user} onLogout={logout} />
      
      <main className="main-content">
        {!user ? (
          !showAuth ? (
            <LandingPage />
          ) : (
            <div className="auth-section">
              <button className="back-btn" onClick={() => setShowAuth(false)}>← Back to Home</button>
              <div className="auth-card">
                <form onSubmit={handleSubmit}>
                  <h2>{isRegistering ? 'Create Account' : 'Portal Login'}</h2>
                  {error && <p className="error-text">{error}</p>}

                  {isRegistering && (
                    <div className="input-group">
                      <label>Full Name</label>
                      <input 
                        type="text" placeholder="Enter your name" className="form-input" required
                        onChange={e => setCredentials({...credentials, name: e.target.value})}
                      />
                    </div>
                  )}

                  <div className="input-group">
                    <label>I am a:</label>
                    <select className="form-input" value={credentials.role} onChange={e => setCredentials({...credentials, role: e.target.value})}>
                      <option value="ngo">NGO Admin</option>
                      <option value="volunteer">Field Volunteer</option>
                      <option value="individual">Community Member</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Email Address</label>
                    <input 
                      type="email" placeholder="email@example.com" className="form-input" required
                      onChange={e => setCredentials({...credentials, email: e.target.value})}
                    />
                  </div>
                  
                  <button type="submit" className="primary-button">
                    {isRegistering ? 'Register Now' : 'Sign In'}
                  </button>

                  <p className="toggle-auth" onClick={() => setIsRegistering(!isRegistering)}>
                    {isRegistering ? 'Already have an account? Login' : 'New to Pulse? Create an account'}
                  </p>
                </form>
              </div>
            </div>
          )
        ) : (
          <div className="dashboard-container">
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