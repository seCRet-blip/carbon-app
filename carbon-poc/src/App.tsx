import { useState } from 'react';
import { Map } from './components/map';
import { Dashboard } from './components/dashBoard';
import { Login } from './auth/login';
import { Signup } from './auth/signup';
import { NavigationSidebar } from './components/NavigationSidebar';

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

  if (authState === 'authenticated' && user) {
    return (
      <>
        <NavigationSidebar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onLogout={handleLogout}
          user={user}
        />
        <div style={{ marginLeft: '240px' }}>
          {currentView === 'map' ? (
            <Map />
          ) : (
            <Dashboard
              user={user}
              onNavigateToMap={handleNavigateToMap}
              onLogout={handleLogout}
            />
          )}
        </div>
      </>
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