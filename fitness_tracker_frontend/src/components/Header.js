import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

function getPageTitle(path) {
  if (path.startsWith('/workouts')) return 'Workouts';
  if (path.startsWith('/goals')) return 'Fitness Goals';
  if (path.startsWith('/history')) return 'Activity History';
  return 'Dashboard';
}

// PUBLIC_INTERFACE
function Header() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <header className="page-header">
      <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
      {user && (
        <div className="header-profile">
          <span className="header-username">👤 {user.username}</span>
        </div>
      )}
    </header>
  );
}

export default Header;
