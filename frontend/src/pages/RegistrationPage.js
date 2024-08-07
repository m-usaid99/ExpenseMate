import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/user/userSlice';
import { Link, useNavigate } from 'react-router-dom';


const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  const handleRegister = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    dispatch(register(formData))
      .unwrap()
      .then(() => {
        navigate('/dashboard');
      })
      .catch(() => {
        // Handle error if needed
      });
  };


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
        <Typography variant="h2" component="h1" gutterBottom>ExpenseMate</Typography>
        <Typography variant='h5' component='h2' gutterBottom>Sign Up</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <Box
          component="form"
          sx={{ m1: 1, width: '100%', }}
          onSubmit={handleRegister}
        >
          <TextField
            margin='normal'
            required
            fullWidth
            id='name'
            label='Name'
            name="name"
            autoComplete='name'
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label='Password'
            name='password'
            type='password'
            autoComplete='current-password'
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='confirmPassword'
            label='Confirm Password'
            name='confirmPassword'
            type='password'
            autoComplete='confirm-password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
          <Link to='/'>
            <Button variant='text'>Already have an account?</Button>
          </Link>
          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default RegistrationPage;
