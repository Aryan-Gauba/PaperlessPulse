import React, { useState } from 'react';

export default function Auth({ onAuthSuccess, onBack }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [credentials, setCredentials] = useState({ 
    name: '', 
    email: '', 
    role: 'volunteer', 
    password: 'password123' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
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
        // Critical: Store with the exact key the dashboards expect
        localStorage.setItem('pulse_token', data.token);
        onAuthSuccess(data);
      } else {
        setError(data.message || "Authentication failed");
      }
    } catch (err) {
      setError("Server connection failed. Is the backend running on port 5000?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-section">
      <button className="back-btn" onClick={onBack}>← Back to Home</button>
      <div className="auth-card">
        <form onSubmit={handleSubmit}>
          <h2>{isRegistering ? 'Create Account' : 'Portal Login'}</h2>
          {error && <p className="error-text" style={{color: '#dc2626', marginBottom: '1rem', fontSize: '0.9rem'}}>{error}</p>}

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
          
          <button type="submit" className="primary-button" disabled={isLoading}>
            {isLoading ? 'Processing...' : (isRegistering ? 'Register Now' : 'Sign In')}
          </button>

          <p className="toggle-auth" style={{cursor: 'pointer', marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#2563eb'}} 
             onClick={() => {
               setIsRegistering(!isRegistering);
               setError('');
             }}>
            {isRegistering ? 'Already have an account? Login' : 'New to Pulse? Create an account'}
          </p>
        </form>
      </div>
    </div>
  );
}

// const Auth = ({ onAuthSuccess, onBack }) => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [credentials, setCredentials] = useState({ name: '', email: '', role: 'individual', password: 'password123' });
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);
//     const endpoint = isRegistering ? '/api/register' : '/api/login';
//     try {
//       const res = await fetch(`http://localhost:5000${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(credentials)
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('pulse_token', data.token);
//         localStorage.setItem('pulse_user', JSON.stringify({ name: data.name, role: data.role }));
//         onAuthSuccess(data);
//       } else {
//         setError(data.message || "Authentication failed");
//       }
//     } catch (err) {
//       setError("Server connection failed. Is the backend running?");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="auth-section">
//       <button className="back-btn" onClick={onBack}>← Back to Home</button>
//       <div className="auth-card">
//         <form onSubmit={handleSubmit}>
//           <h2>{isRegistering ? 'Create Account' : 'Portal Login'}</h2>
//           {error && <p className="error-text">{error}</p>}
//           {isRegistering && (
//             <div className="input-group">
//               <label>Full Name</label>
//               <input type="text" placeholder="Enter your name" className="form-input" required onChange={e => setCredentials({...credentials, name: e.target.value})} />
//             </div>
//           )}
//           <div className="input-group">
//             <label>I am a:</label>
//             <select className="form-input" value={credentials.role} onChange={e => setCredentials({...credentials, role: e.target.value})}>
//               <option value="ngo">NGO Admin</option>
//               <option value="volunteer">Field Volunteer</option>
//               <option value="individual">Community Member</option>
//             </select>
//           </div>
//           <div className="input-group">
//             <label>Email Address</label>
//             <input type="email" placeholder="email@example.com" className="form-input" required onChange={e => setCredentials({...credentials, email: e.target.value})} />
//           </div>
//           <button type="submit" className="primary-button" disabled={isLoading}>{isLoading ? 'Processing...' : (isRegistering ? 'Register Now' : 'Sign In')}</button>
//           <p className="toggle-auth" onClick={() => { setIsRegistering(!isRegistering); setError(''); }}>
//             {isRegistering ? 'Already have an account? Login' : 'New to Pulse? Create an account'}
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };