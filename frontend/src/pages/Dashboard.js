// src/pages/Dashboard.js
import React from "react";
import { Container, Typography } from "@mui/material";
import SummaryCardsSection from "../components/SummaryCardsSection";
import ChartsSection from "../components/ChartsSection";
import Layout from "../components/Layout";

const Dashboard = () => {
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
        <SummaryCardsSection />
        <ChartsSection />
      </Container>
    </Layout>
  );
};

export default Dashboard;
