import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Category, Fastfood, Home, Payment, DirectionsCar } from '@mui/icons-material'; // Example icons

const categoryIcons = {
  Food: <Fastfood />,
  Rent: <Home />,
  Utilities: <Payment />,
  Transportation: <DirectionsCar />,
  Other: <Category />
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', marginTop: 2 }}>
      <TableContainer component={Paper} sx={{ width: '80%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} sx={{ fontSize: '1rem' }}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  {categoryIcons[expense.category] || categoryIcons['Other']} {expense.category}
                </TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.tags.join(', ')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(expense)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(expense.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExpenseList;
