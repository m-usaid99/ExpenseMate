import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordAsync } from '../features/user/userSlice';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setMessage(null);
    try {
      await dispatch(resetPasswordAsync({ token, password })).unwrap();
      setSuccess('Password has been successfully reset! Redirecting to login page...');
      setTimeout(() => {
        navigate('/');
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error('Failed to reset password', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          textAlign: 'center', // Center the text
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          ExpenseMate
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 2 }}>
          Reset Password
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ mt: 2, mb: 4 }}>
          Enter your new password below and confirm it. Once you submit, your password will be updated.
        </Typography>
        {message && <Alert severity="error">{message}</Alert>}
        {error && <Alert severity="error">{error.message}</Alert>}
        {success && <Alert severity="success">{success}</Alert>} {/* Display success message */}
        <Box
          component="form"
          sx={{
            mt: 1,
            width: '100%',
          }}
          onSubmit={handleSubmit}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            sx={{ mt: 3, mb: 2, }} // Adjust button width
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
};

export default ResetPasswordPage;
