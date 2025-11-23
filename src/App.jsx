import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

const App = () => {
  // View states: 'landing', 'login', 'signup', 'dashboard'
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);

  const handleAuth = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  // Basic routing logic
  switch (currentView) {
    case 'dashboard':
      return <Dashboard user={user} onLogout={handleLogout} />;
    case 'login':
      return <AuthPage type="login" onNavigate={setCurrentView} onAuth={handleAuth} />;
    case 'signup':
      return <AuthPage type="signup" onNavigate={setCurrentView} onAuth={handleAuth} />;
    case 'landing':
    default:
      return <LandingPage onNavigate={setCurrentView} />;
  }
};

export default App;