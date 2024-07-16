import React from "react";
import { Box, TextField, MenuItem, Button, Grid } from "@mui/material";

const categories = [
  "Food",
  "Rent",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Education",
  "Commute",
  "Insurance",
  "Shopping",
  "Travel",
  "Grocery",
  "Miscellaneous",
];

const tags = ["Monthly", "One-time", "Recurring"];

const ExpenseFilters = ({ filters, onFilterChange, handleAddExpense, handleResetFilters }) => {
  const handleCategoryChange = (e) => {
    onFilterChange("category", e.target.value);
  };

  const handleTagChange = (e) => {
    onFilterChange("tags", e.target.value);
  };

  return (
    <Box sx={{ marginBottom: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            select
            label="Category"
            value={filters.category}
            onChange={handleCategoryChange}
            variant="outlined"
            fullWidth
            size="small"
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
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            select
            label="Tags"
            value={filters.tags}
            onChange={handleTagChange}
            variant="outlined"
            fullWidth
            size="small"
            SelectProps={{
              multiple: true,
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
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "10px",
            }}
          >
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleResetFilters}
              sx={{ whiteSpace: "nowrap" }}
            >
              Reset Filters
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} md={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "10px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddExpense}
              sx={{ whiteSpace: "nowrap" }}
            >
              Add Expense
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseFilters;
