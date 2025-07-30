import React, { createContext, useState, useEffect, useContext } from 'react';

// This should point at your backend; replace with correct API host if needed
const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('username'); 
    return token ? { token, username: name } : null;
  });

  useEffect(() => {
    // Optionally refresh user data here in a real app
  }, []);

  // PUBLIC_INTERFACE
  async function login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Invalid login');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setUser({ token: data.token, username: data.username });
    return data;
  }

  // PUBLIC_INTERFACE
  async function register(name, email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (!res.ok) throw new Error('Registration failed');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    setUser({ token: data.token, username: data.username });
    return data;
  }

  // PUBLIC_INTERFACE
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  }

  // PUBLIC_INTERFACE
  function authHeaders() {
    return user ? { Authorization: `Bearer ${user.token}` } : {};
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, authHeaders }}>
      {children}
    </AuthContext.Provider>
  );
}
