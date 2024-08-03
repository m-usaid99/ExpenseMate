import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { requestPasswordResetAsync } from '../features/user/userSlice';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    try {
      await dispatch(requestPasswordResetAsync({ email })).unwrap();
      setMessage('If an account with that email exists a password reset link has been sent to your email.')
    } catch (error) {
      setError('Failed to send password reset email');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{
        mt: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <Typography variant='h2' component='h1' gutterBottom>
          ExpenseMate
        </Typography>
        <Typography variant='h5' component='h2' gutterBottom>
          Forgot Your Password?
        </Typography>
        <Typography variant='h6' component='h3' gutterBottom>
          No worries, we've got you covered!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mt: 2, mb: 4 }}>
          Enter your email address below and we'll send you a link to reset your password.
          If you don't receive the email within a few minutes, please check your spam folder.
        </Typography>
        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component='form'
          sx={{
            mt: 1,
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, }}
          >
            Send Reset Link
          </Button>
          <Box sx={{ display: 'flex' }}>
            <Link to='/'>
              <Button variant='text'>Remember Your Password?</Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  )

}

export default ForgotPasswordPage;
