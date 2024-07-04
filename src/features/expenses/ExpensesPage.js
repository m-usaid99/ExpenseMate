import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, editExpense, deleteExpense } from './expensesSlice';
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';
import ExpenseModal from './ExpenseModal';
import Layout from '../../components/Layout';

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const [filters, setFilters] = useState({ search: '', category: '', tags: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
  };

  const handleSaveExpense = (expense) => {
    if (selectedExpense) {
      dispatch(editExpense(expense));
    } else {
      dispatch(addExpense({ ...expense, id: Date.now() }));
    }
    setIsModalOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Expenses
      </Typography>
      <ExpenseFilters filters={filters} onFilterChange={handleFilterChange} handleAddExpense={handleAddExpense} />
      <ExpenseList expenses={expenses} onEdit={handleEditExpense} onDelete={handleDeleteExpense} />
      <ExpenseModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExpense}
        expense={selectedExpense}
      />
    </Layout>
  );
};

export default ExpensesPage;
