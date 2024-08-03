// src/api/expenseService.js
import apiClient from './axios';
import { subMonths, format } from 'date-fns';

export const fetchIncomes = async () => {
  const endDate = new Date();
  const startDate = subMonths(endDate, 12);

  try {
    const response = await apiClient.get('/income', {
      params: {
        startDate: format(startDate, 'yyyy-MM-dd'),
        endDate: format(endDate, 'yyyy-MM-dd'),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching incomes:', error); // Log error
    throw error;
  }
};


export const addIncome = async (incomeData) => {
  const response = await apiClient.post('/income', incomeData);
  return response.data;
};

export const updateIncome = async (id, incomeData) => {
  const response = await apiClient.put(`/income/${id}`, incomeData);
  return response.data;
};

export const deleteIncome = async (id) => {
  const response = await apiClient.delete(`/income/${id}`);
  return response.data;
};

