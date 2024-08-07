// src/api/expenseService.js
import apiClient from './axios';
import { subMonths, format } from 'date-fns';

export const fetchExpenses = async () => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 12);

  try {
    const response = await apiClient.get('/expense', {
      params: {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error); // Log error
    throw error;
  }
};


export const addExpense = async (expenseData) => {
  const response = await apiClient.post('/expense', expenseData);
  return response.data;
};

export const updateExpense = async (id, expenseData) => {
  const response = await apiClient.put(`/expense/${id}`, expenseData);
  return response.data;
};

export const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/expense/${id}`);
  return response.data;
};

