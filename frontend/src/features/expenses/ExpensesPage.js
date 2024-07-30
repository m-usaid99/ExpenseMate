import React, { useState, useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpensesAsync,
  addExpenseAsync,
  updateExpenseAsync,
  deleteExpense,
  selectTotalExpenses,
  selectExpenseTrendsData,
} from "./expensesSlice";
import ExpenseList from "./ExpenseList";
import ExpenseFilters from "./ExpenseFilters";
import ExpenseModal from "./ExpenseModal";
import Layout from "../../components/Layout";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseTrends from "./ExpenseTrends";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const totalExpenses = useSelector(selectTotalExpenses);
  const expenseTrendsData = useSelector(selectExpenseTrendsData);
  const [filters, setFilters] = useState({
    category: "",
    tag: "",
    startDate: null,
    endDate: null,
    amountRange: [0, 10000],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    dispatch(fetchExpensesAsync());
  }, [dispatch]);

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

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      dispatch(deleteExpense(id));
    } catch (error) {
      console.error("Failed to delete expense:", error);
    }
  };

  const handleSaveExpense = async (expense) => {
    try {
      if (selectedExpense) {
        dispatch(updateExpenseAsync({ id: selectedExpense._id, expenseData: expense }));
      } else {
        dispatch(addExpenseAsync(expense));
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save expense:", error);
    }
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      tag: "",
      startDate: null,
      endDate: null,
      amountRange: [0, 10000],
    });
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = filters.category
      ? expense.category === filters.category
      : true;
    const matchesTag = filters.tag
      ? expense.tag === filters.tag
      : true;
    const matchesStartDate = filters.startDate
      ? new Date(expense.date) >= new Date(filters.startDate)
      : true;
    const matchesEndDate = filters.endDate
      ? new Date(expense.date) <= new Date(filters.endDate)
      : true;
    const matchesAmountRange =
      expense.amount >= filters.amountRange[0] &&
      expense.amount <= filters.amountRange[1];
    return (
      matchesCategory &&
      matchesTag &&
      matchesStartDate &&
      matchesEndDate &&
      matchesAmountRange
    );
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          Expenses
        </Typography>
        <Box sx={{ marginBottom: 4 }}>
          <ExpenseSummary totalExpenses={totalExpenses} />
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <ExpenseTrends data={expenseTrendsData} />
        </Box>
        <Box sx={{ marginBottom: 4 }}>
          <ExpenseFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            handleAddExpense={handleAddExpense}
            handleResetFilters={handleResetFilters}
          />
        </Box>
        <ExpenseList
          expenses={filteredExpenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
        <ExpenseModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveExpense}
          expense={selectedExpense}
        />
      </Container>
    </Layout>
  );
};

export default ExpensesPage;

