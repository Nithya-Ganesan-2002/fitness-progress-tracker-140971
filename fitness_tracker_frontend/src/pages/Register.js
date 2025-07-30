import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (e) {
      setError('Could not sign up. Try a different email.');
    }
  }

  return (
    <div className="auth-center">
      <div className="card" style={{ maxWidth: 370, margin: '56px auto 28px auto', boxShadow: "0 2px 12px #c9ecfa" }}>
        <h2 style={{ color: "var(--primary)" }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input required id="name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input required id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="pw">Password:</label>
            <input required id="pw" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit" className="btn-accent" style={{marginTop:7, width:"100%"}}>Sign up</button>
        </form>
        <div style={{marginTop:"1em"}}>Already have an account? <Link to="/login">Sign in</Link></div>
      </div>
    </div>
  );
}

export default Register;
