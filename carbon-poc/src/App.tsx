import { useState } from 'react';
import { Map } from './components/map';
import { Dashboard } from './components/dashBoard';
import { Login } from './auth/login';
import { Signup } from './auth/signup';

type AuthState = 'login' | 'signup' | 'authenticated';
type ViewState = 'dashboard' | 'map';

function App() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [user, setUser] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');

  const handleLogin = (email: string, password: string) => {
    // Here you would typically validate credentials with a backend
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, accept any login
    setUser(email);
    setAuthState('authenticated');
    setCurrentView('dashboard'); // Start with dashboard
  };

  const handleSignup = (email: string, password: string, confirmPassword: string) => {
    // Here you would typically create a new user account
    console.log('Signup attempt:', { email, password, confirmPassword });
    
    // For demo purposes, accept any signup
    setUser(email);
    setAuthState('authenticated');
    setCurrentView('dashboard'); // Start with dashboard
  };

  const handleLogout = () => {
    setUser(null);
    setAuthState('login');
    setCurrentView('dashboard');
  };

  const handleNavigateToMap = () => {
    setCurrentView('map');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (authState === 'authenticated' && user) {
    if (currentView === 'map') {
      return (
        <>
          <div style={{ 
            position: 'absolute', 
            top: 10, 
            right: 10, 
            zIndex: 1001,
            background: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            gap: '10px'
          }}>
            <button 
              onClick={handleBackToDashboard}
              style={{ cursor: 'pointer' }}
            >
              Back to Dashboard
            </button>
            <span>Welcome, {user}</span>
            <button 
              onClick={handleLogout}
              style={{ cursor: 'pointer' }}
            >
              Logout
            </button>
          </div>
          <Map />
        </>
      );
    }

    return (
      <Dashboard
        user={user}
        onNavigateToMap={handleNavigateToMap}
        onLogout={handleLogout}
      />
    );
  }

  if (authState === 'signup') {
    return (
      <Signup
        onSignup={handleSignup}
        onSwitchToLogin={() => setAuthState('login')}
      />
    );
  }

  return (
    <Login
      onLogin={handleLogin}
      onSwitchToSignup={() => setAuthState('signup')}
    />
  );
}

export default App;