import React from "react";
import { Box, TextField, MenuItem, Button, Grid } from "@mui/material";

const categories = ["Salary", "Freelance", "Investments", "Other"];
const tags = ["Monthly", "One-time", "Quarterly"];

const IncomeFilters = ({ filters, onFilterChange, handleAddIncome }) => {
  const handleTagsChange = (e) => {
    const value = e.target.value;
    onFilterChange("tags", Array.isArray(value) ? value : [value]);
    console.log("Tags Value:", value); // Debugging output
  };

  console.log("Filters State:", filters); // Debugging output

  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            select
            label="Category"
            value={filters.category}
            onChange={(e) => onFilterChange("category", e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
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
            onChange={handleTagsChange}
            variant="outlined"
            fullWidth
            size="small"
            SelectProps={{ multiple: true }}
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleAddIncome}>
            Add Income
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IncomeFilters;
