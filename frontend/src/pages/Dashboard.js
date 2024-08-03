// src/pages/Dashboard.js
import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";
import SummaryCardsSection from "../components/SummaryCardsSection";
import ChartsSection from "../components/ChartsSection";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncomesAsync, selectTotalIncome } from "../features/income/incomeSlice";
import { fetchExpensesAsync, selectTotalExpenses } from "../features/expenses/expensesSlice";
import RecentTransactions from "../components/RecentTransactions";

const Dashboard = () => {
  const dispatch = useDispatch();
  const totalExpenses = useSelector(selectTotalExpenses);
  const totalIncome = useSelector(selectTotalIncome);

  useEffect(() => {
    dispatch(fetchExpensesAsync());
    dispatch(fetchIncomesAsync());
  }, [dispatch]);
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
          Dashboard
        </Typography>
        <SummaryCardsSection totalExpenses={totalExpenses} totalIncome={totalIncome} />
        <ChartsSection />
        <RecentTransactions />
      </Container>
    </Layout>
  );
};

export default Dashboard;
