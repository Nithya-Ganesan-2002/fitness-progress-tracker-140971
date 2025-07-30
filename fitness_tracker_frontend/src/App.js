import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Workouts from './pages/Workouts';
import Goals from './pages/Goals';
import History from './pages/History';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

// PUBLIC_INTERFACE
function App() {
  // Theme colors handled in App.css, palette matches project requirements

  return (
    <AuthProvider>
      <Router>
        <div className="main-layout">
          <Sidebar />
          <div className="content-area">
            <Header />
            <main>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/workouts" element={
                  <PrivateRoute>
                    <Workouts />
                  </PrivateRoute>
                } />
                <Route path="/goals" element={
                  <PrivateRoute>
                    <Goals />
                  </PrivateRoute>
                } />
                <Route path="/history" element={
                  <PrivateRoute>
                    <History />
                  </PrivateRoute>
                } />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
