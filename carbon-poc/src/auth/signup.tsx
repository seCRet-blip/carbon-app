import { useState, useEffect } from 'react';
import { Box, Paper, TextField, Button, Typography, Link } from '@mui/material';

type SignupProps = {
  onSignup: (email: string, password: string, confirmPassword: string) => void;
  onSwitchToLogin: () => void;
};

export function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    if (email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }

    if (!password && !confirmPassword) {
      setPasswordError('');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else if (password.length > 0 && password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must contain at least one uppercase letter');
    } else {
      setPasswordError('');
    }
  }, [email, password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordError) {
      onSignup(email, password, confirmPassword);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Typography variant='body2' color='error' sx={{ mt: 1 }}>
            {emailError}
          </Typography>
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            helperText="Enter at least 8 characters with one uppercase letter"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
            required
          />
          <Typography variant='body2' color='error' sx={{ mt: 1 }}>
            {passwordError}
          </Typography>
          {passwordError ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          )}
          <Typography variant="body2">
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={onSwitchToLogin}
              sx={{ cursor: 'pointer' }}
            >
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}