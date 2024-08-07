import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import { Edit, Delete, LocalHospital, Commute, LocalDining, School, Movie, ShoppingCart } from '@mui/icons-material';
import { Category, Fastfood, Home, Payment, DirectionsCar, Flight } from '@mui/icons-material';
import { format, parseISO } from 'date-fns';

const categoryIcons = {
  Food: <Fastfood />,
  Rent: <Home />,
  Utilities: <Payment />,
  Transportation: <DirectionsCar />,
  Entertainment: <Movie />,
  Healthcare: <LocalHospital />,
  Education: <School />,
  Commute: <Commute />,
  Insurance: <Category />,
  Shopping: <ShoppingCart />,
  Travel: <Flight />,
  Groceries: <LocalDining />,
  Miscellaneous: <Category />
};

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', marginTop: 2 }}>
      <TableContainer component={Paper} sx={{ width: '100%', maxHeight: 400, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Tag</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenses.map((expense) => (
              <TableRow key={expense._id} sx={{ fontSize: '1rem' }}>
                <TableCell>{format(parseISO(expense.date), 'yyyy-MM-dd')}</TableCell>
                <TableCell>
                  {categoryIcons[expense.category] || categoryIcons['Miscellaneous']} {expense.category}
                </TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.tag}</TableCell>
                <TableCell>{expense.notes}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(expense)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(expense._id)}>
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

