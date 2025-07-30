import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Sidebar.css';

// PUBLIC_INTERFACE
function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sidebar">
      <div className="sidebar-brand">
        <span role="img" aria-label="dumbbell" className="sidebar-logo">🏋️‍♂️</span>
        <span className="sidebar-title">FitDash</span>
      </div>
      {user && (
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? "active" : ""} end>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/workouts" className={({isActive}) => isActive ? "active" : ""}>
              Workouts
            </NavLink>
          </li>
          <li>
            <NavLink to="/goals" className={({isActive}) => isActive ? "active" : ""}>
              Goals
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={({isActive}) => isActive ? "active" : ""}>
              History
            </NavLink>
          </li>
        </ul>
      )}
      <div className="sidebar-bottom">
        {user ? (
          <button className="sidebar-logout" onClick={logout}>Logout</button>
        ) : (
          <NavLink to="/login" className="sidebar-login-btn">Sign In</NavLink>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;
