// src/api/userService.js
import apiClient from './axios';

export const login = async (credentials) => {
  const response = await apiClient.post('/users/login', credentials);
  const token = response.data.token;
  if (token) {
    localStorage.setItem('token', token); // Store the token
  } else {
    console.error('Token not found in response');
  }
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/users/register', userData);
  const token = response.data.token;
  localStorage.setItem('token', token); // Store the token
  return response.data;
};

