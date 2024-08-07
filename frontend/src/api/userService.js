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

export const requestPasswordReset = async (email) => {
  try {
    const response = await apiClient.post('/users/request-reset', { email }, { skipAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset', error);
    throw error;
  }
};

export const resetPassword = async (token, password) => {
  try {
    const response = await apiClient.put(`/users/reset-password/${token}`, { password }, { skipAuth: true });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  const response = await apiClient.put('/users/profile', profileData);
  return response;
};

export const updateUserSettings = async (settings) => {
  const response = await apiClient.put('/users/settings', settings);
  return response.data;
};
