import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Grid, Slider, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useSelector } from "react-redux";

const categories = ["Salary", "Freelance", "Investment", "Other"];

const tags = ["Monthly", "One-time", "Quarterly"];

const IncomeFilters = ({ filters, onFilterChange, handleAddIncome, handleResetFilters }) => {
  const income = useSelector((state) => state.income.income);
  const maxIncome = Math.max(...income.map((inc) => inc.amount), 0);

  const [startDate, setStartDate] = useState(filters.startDate || null);

  const handleCategoryChange = (e) => {
    onFilterChange("category", e.target.value);
  };

  const handleTagChange = (e) => {
    onFilterChange("tags", e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onFilterChange("startDate", date);
  };

  const handleEndDateChange = (date) => {
    onFilterChange("endDate", date);
  };

  const handleAmountRangeChange = (event, newValue) => {
    onFilterChange("amountRange", newValue);
  };

  const buttonStyle = {
    height: '56px', // Match the height of medium size input fields
    minWidth: '120px', // Make buttons wider
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ marginBottom: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <TextField
                select
                label="Category"
                value={filters.category}
                onChange={handleCategoryChange}
                variant="outlined"
                size="medium"
                sx={{ flexGrow: 1 }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Adjust the height as needed
                      },
                    },
                  },
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label="Tags"
                value={filters.tags}
                onChange={handleTagChange}
                variant="outlined"
                size="medium"
                sx={{ flexGrow: 1 }}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 200, // Adjust the height as needed
                      },
                    },
                  },
                }}
              >
                {tags.map((tag) => (
                  <MenuItem key={tag} value={tag}>
                    {tag}
                  </MenuItem>
                ))}
              </TextField>
              <DatePicker
                label="Start Date"
                value={filters.startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" size="medium" sx={{ flexGrow: 1 }} />
                )}
              />
              <DatePicker
                label="End Date"
                value={filters.endDate}
                onChange={handleEndDateChange}
                minDate={startDate}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" size="medium" sx={{ flexGrow: 1 }} />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
              <Box sx={{ flexGrow: 1, padding: '0 10px', maxWidth: 300 }}>
                <Typography id="amount-range-slider" gutterBottom>
                  Amount Range
                </Typography>
                <Slider
                  value={filters.amountRange || [0, maxIncome]}
                  onChange={handleAmountRangeChange}
                  valueLabelDisplay="auto"
                  aria-labelledby="amount-range-slider"
                  min={0}
                  max={maxIncome}
                  sx={{ marginTop: 2 }}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 4 }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleResetFilters}
                  sx={{ whiteSpace: "nowrap", ...buttonStyle }}
                >
                  Reset Filters
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddIncome}
                  sx={{ whiteSpace: "nowrap", ...buttonStyle }}
                >
                  Add Income
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
};

export default IncomeFilters;
