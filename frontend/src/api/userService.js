// src/api/userService.js
import apiClient from './axios';

export const login = async (credentials) => {
  const response = await apiClient.post('/users/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/users/register', userData);
  return response.data;
};

// Other API requests...

