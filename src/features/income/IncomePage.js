import React, { useEffect, useState } from "react";
import { Typography, Container, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addIncome, editIncome, deleteIncome, selectRecentIncome, selectTotalIncome, selectIncomeTrendsData } from "./incomeSlice";
import IncomeList from "./IncomeList";
import IncomeFilters from "./IncomeFilters";
import IncomeModal from "./IncomeModal";
import Layout from "../../components/Layout";
import IncomeSummary from "./IncomeSummary";
import IncomeTrends from "./IncomeTrends";

const IncomePage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.income);
  const recentIncome = useSelector(selectRecentIncome);
  const totalIncome = useSelector(selectTotalIncome);
  const incomeTrendsData = useSelector(selectIncomeTrendsData);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    tags: [],
  }); // Ensure tags is an array
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
          />
        </Box>
        <IncomeList
          income={recentIncome}
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
