import { useState,useEffect } from 'react';
import { ImageUpload } from './components/ImageUpload';
import { Dashboard } from './components/dashBoard';
import { Login } from './auth/login';
import { Signup } from './auth/signup';
import { NavigationSidebar } from './components/NavigationSidebar';

import { auth } from '../config/firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import type { User } from 'firebase/auth';

type AuthState = 'login' | 'signup' | 'authenticated';
type ViewState = 'dashboard' | 'map';

function App() {
  const [authState, setAuthState] = useState<AuthState>('login');
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [loginError, setLoginError] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return unsubscribe;
  }, []);

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoginError('');
      await signInWithEmailAndPassword(auth, email, password);
      
      // For demo purposes, accept any login
      // setUser(email);
      // setAuthState('authenticated');
      setCurrentView('dashboard'); // Start with dashboard
    } catch (er: any) {
      console.log(er);
      if (er.code === 'auth/wrong-password' || er.code === 'auth/user-not-found') {
        setLoginError('Invalid email or password.');
      } else {
        setLoginError('Login Failed. Please try again.');
      }
    }

  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
          
      // For demo purposes, accept any signup
      // setUser(email);
      // setAuthState('authenticated');
      setCurrentView('dashboard'); // Start with dashboard
    } catch (er) {
      console.log(er);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    // setUser(null);
    // setAuthState('login');
    setCurrentView('dashboard');
  };

  const handleNavigateToMap = () => {
    setCurrentView('map');
  };

  if (user) {
    return (
      <>
        <NavigationSidebar
          currentView={currentView}
          onNavigate={(view) => setCurrentView(view)}
          onLogout={handleLogout}
          user={user.email || ''}
        />
        <div style={{ marginLeft: '240px' }}>
          {currentView === 'map' ? (
            <ImageUpload />
          ) : (
            <Dashboard
              user={user.email || ''}
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
      errorMessage={loginError}
    />
  );
}

export default App;