// src/components/ExpenseFilters.js
import React from 'react';
import { Box, TextField, MenuItem } from '@mui/material';

const categories = ['Food', 'Rent', 'Utilities', 'Entertainment'];
const tags = ['Monthly', 'One-time', 'Recurring'];

const ExpenseFilters = ({ filters, onFilterChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Search"
        value={filters.search}
        onChange={(e) => onFilterChange('search', e.target.value)}
        variant="outlined"
      />
      <TextField
        select
        label="Category"
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        variant="outlined"
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
        onChange={(e) => onFilterChange('tags', e.target.value)}
        variant="outlined"
      >
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            {tag}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};

export default ExpenseFilters;
