import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ExpenseList from '../components/ExpenseList';
import ExpenseFilters from '../components/ExpenseFilters';
import ExpenseModal from '../components/ExpenseModal';
import Layout from '../components/Layout';

const initialExpenses = [
  { id: 1, date: '2023-07-01', category: 'Food', amount: 20, tags: ['Monthly'], notes: 'Lunch' },
  { id: 2, date: '2023-07-02', category: 'Rent', amount: 500, tags: ['Monthly'], notes: 'July Rent' }
];

const Expenses = () => {
  const [expenses, setExpenses] = useState(initialExpenses);
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
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const handleSaveExpense = (expense) => {
    if (selectedExpense) {
      setExpenses((prevExpenses) =>
        prevExpenses.map((e) => (e.id === selectedExpense.id ? expense : e))
      );
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, { ...expense, id: Date.now() }]);
    }
  };

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

export default Expenses;
