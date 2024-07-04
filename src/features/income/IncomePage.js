import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addIncome, editIncome, deleteIncome } from './incomeSlice';
import IncomeList from './IncomeList';
import IncomeFilters from './IncomeFilters';
import IncomeModal from './IncomeModal';
import Layout from '../../components/Layout';

const IncomePage = () => {
  const dispatch = useDispatch();
  const { income, loading, error } = useSelector((state) => state.income);
  const [filters, setFilters] = useState({ search: '', category: '', tags: [] }); // Ensure tags is an array
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleAddIncome = () => {
    setSelectedIncome(null);
    setIsModalOpen(true);
  };

  const handleEditIncome = (income) => {
    setSelectedIncome(income);
    setIsModalOpen(true);
  };

  const handleDeleteIncome = (id) => {
    dispatch(deleteIncome(id));
  };

  const handleSaveIncome = (income) => {
    if (selectedIncome) {
      dispatch(editIncome(income));
    } else {
      dispatch(addIncome({ ...income, id: Date.now() }));
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log(filters); // Debugging output
  }, [filters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Income
      </Typography>
      <IncomeFilters filters={filters} onFilterChange={handleFilterChange} handleAddIncome={handleAddIncome} />
      <IncomeList income={income} onEdit={handleEditIncome} onDelete={handleDeleteIncome} />
      <IncomeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveIncome}
        income={selectedIncome}
      />
    </Layout>
  );
};

export default IncomePage;
