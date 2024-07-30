// src/components/LoginPage.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { login } from "../features/user/userSlice";
import { useDispatch, useSelector } from 'react-redux';

const LoginPage = () => {
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
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          ExpenseMate
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error.message}</Alert>}
        <Box
          component="form"
          sx={{
            mt: 1,
            width: '100%', // Fix IE11 issue.
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
