import React from 'react';
import { Box, TextField, MenuItem, Button, Grid } from '@mui/material';

const categories = ['Food', 'Rent', 'Utilities', 'Entertainment'];
const tags = ['Monthly', 'One-time', 'Recurring'];

const ExpenseFilters = ({ filters, onFilterChange, handleAddExpense }) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            label="Search"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <TextField
            select
            label="Category"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
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
            onChange={(e) => onFilterChange('tags', e.target.value)}
            variant="outlined"
            fullWidth
            size="small"
          >
            {tags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3} md={2}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '10px' }}>
            <Button variant="contained" color="primary" onClick={handleAddExpense}>
              Add Expense
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseFilters;