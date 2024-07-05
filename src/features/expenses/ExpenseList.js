import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Category, Fastfood, Home, Payment, DirectionsCar } from '@mui/icons-material';

const categoryIcons = {
  Food: <Fastfood />,
  Rent: <Home />,
  Utilities: <Payment />,
  Transportation: <DirectionsCar />,
  Entertainment: <Category />,
  Healthcare: <Category />,
  Education: <Category />,
  Shopping: <Category />,
  Travel: <Category />,
  Miscellaneous: <Category />
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
      <TableContainer component={Paper} sx={{ width: '90%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense.id} sx={{ fontSize: '1rem' }}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>
                  {categoryIcons[expense.category] || categoryIcons['Miscellaneous']} {expense.category}
                </TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.tags.join(', ')}</TableCell>
                <TableCell>{expense.notes}</TableCell>
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
