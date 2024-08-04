// src/components/LoginPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert, useTheme } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { login } from "../features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector((state) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch(login({ email, password }))
    if (userInfo) {
      navigate('/dashboard');
    }
  }

  return (
    <Container maxWidth="sm" sx={{ bgcolor: theme.palette.background.default }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom sx={{ color: theme.palette.text.primary }}>
          ExpenseMate
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: theme.palette.text.secondary }}>
          Login
        </Typography>
        {error && <Alert severity="error">{error.message}</Alert>}
        <Box
          component="form"
          sx={{
            mt: 1,
            width: '100%',
          }}
          onSubmit={handleLogin}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ bgcolor: theme.palette.background.paper, borderRadius: 1 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/register">
              <Button variant='text'>Sign Up</Button>
            </Link>
            <Link to="/forgot-password">
              <Button variant='text'>Forgot Your Password?</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
