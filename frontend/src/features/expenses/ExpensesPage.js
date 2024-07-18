import React, { useState, useEffect } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  editExpense,
  deleteExpense,
  selectRecentExpenses,
} from "./expensesSlice";
import ExpenseList from "./ExpenseList";
import ExpenseFilters from "./ExpenseFilters";
import ExpenseModal from "./ExpenseModal";
import Layout from "../../components/Layout";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseTrends from "./ExpenseTrends";
import { selectTotalExpenses, selectExpenseTrendsData } from "./expensesSlice";

const ExpensesPage = () => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const totalExpenses = useSelector(selectTotalExpenses);
  const recentExpenses = useSelector(selectRecentExpenses);
  const expenseTrendsData = useSelector(selectExpenseTrendsData);
  const [filters, setFilters] = useState({
    category: "",
    tags: "",
    startDate: null,
    endDate: null,
    amountRange: [0, 10000],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    console.log("Expenses:", expenses);
    console.log("Total Expenses:", totalExpenses);
    console.log("Expense Trends Data:", expenseTrendsData);
  }, [expenses, totalExpenses, expenseTrendsData]);

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

  const handleResetFilters = () => {
    setFilters({
      category: "",
      tags: "",
      startDate: null,
      endDate: null,
      amountRange: [0, 10000],
    });
  };

  const filteredExpenses = recentExpenses.filter((expense) => {
    const matchesCategory = filters.category
      ? expense.category === filters.category
      : true;
    const matchesTags = filters.tags
      ? expense.tags === filters.tags
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
      matchesTags &&
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
