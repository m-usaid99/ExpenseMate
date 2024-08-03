import store from '../store'; // Adjust the import path based on your file structure
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    // Check if the request config indicates that a token is required
    if (!config.skipAuth) {
      const state = store.getState();
      const token = state.user.userInfo?.token; // Retrieve token from Redux state
      console.log('Retrieved Token from Redux state:', token); // Log the retrieved token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Authorization Header Set:', config.headers.Authorization); // Log the Authorization header
      } else {
        console.error("No token found in Redux state");
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;

