import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addIncomeAsync,
  updateIncomeAsync,
  deleteIncomeAsync,
  selectTotalIncome,
  selectIncomeTrendsData,
  fetchIncomesAsync,
} from "./incomeSlice";
import IncomeList from "./IncomeList";
import IncomeFilters from "./IncomeFilters";
import IncomeModal from "./IncomeModal";
import Layout from "../../components/Layout";
import IncomeSummary from "./IncomeSummary";
import IncomeTrends from "./IncomeTrends";

const IncomePage = () => {
  const dispatch = useDispatch();
  const { incomes, loading, error } = useSelector((state) => state.income);
  const totalIncome = useSelector(selectTotalIncome);
  const incomeTrendsData = useSelector(selectIncomeTrendsData);
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
    startDate: null,
    endDate: null,
    amountRange: [0, 10000],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);

  useEffect(() => {
    dispatch(fetchIncomesAsync());
  }, [dispatch]);

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

  const handleDeleteIncome = async (id) => {
    try {
      await dispatch(deleteIncomeAsync(id));
    } catch (error) {
      console.error("Failed to delete income:", error);
    }
  };

  const handleSaveIncome = async (income) => {
    try {
      if (selectedIncome) {
        await dispatch(updateIncomeAsync({ id: selectedIncome._id, incomeData: income }));
      } else {
        await dispatch(addIncomeAsync(income));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save income:", error);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      tags: "",
      startDate: null,
      endDate: null,
      amountRange: [0, 10000],
    });
  };

  const filteredIncome = incomes.filter((income) => {
    const matchesCategory = filters.category
      ? income.category === filters.category
      : true;
    const matchesTags = filters.tag ? income.tag === filters.tag : true;
    const matchesStartDate = filters.startDate
      ? new Date(income.date) >= new Date(filters.startDate)
      : true;
    const matchesEndDate = filters.endDate
      ? new Date(income.date) <= new Date(filters.endDate)
      : true;
    const matchesAmountRange =
      income.amount >= filters.amountRange[0] &&
      income.amount <= filters.amountRange[1];
    return (
      matchesCategory &&
      matchesTags &&
      matchesStartDate &&
      matchesEndDate &&
      matchesAmountRange
    );
  });

  return (
    <Layout>
      <Container
        maxWidth="lg"
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          display: "flex",
          flexDirection: "column",
          marginLeft: 0,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Income
        </Typography>
        <Box sx={{ marginBottom: 4 }}>
          <IncomeSummary totalIncome={totalIncome} />
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <IncomeTrends data={incomeTrendsData} />
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <IncomeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            handleAddIncome={handleAddIncome}
            handleResetFilters={handleResetFilters}
          />
        </Box>
        <IncomeList
          income={filteredIncome}
          onEdit={handleEditIncome}
          onDelete={handleDeleteIncome}
        />
        <IncomeModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveIncome}
          income={selectedIncome}
        />
      </Container>
    </Layout>
  );
};

export default IncomePage;
