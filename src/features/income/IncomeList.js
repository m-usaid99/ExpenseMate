import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const IncomeList = ({ income, onEdit, onDelete }) => {
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
            {income.map((inc) => (
              <TableRow key={inc.id} sx={{ fontSize: '1rem' }}>
                <TableCell>{inc.date}</TableCell>
                <TableCell>{inc.category}</TableCell>
                <TableCell>{inc.amount}</TableCell>
                <TableCell>{inc.tags.join(', ')}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(inc)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(inc.id)}>
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

export default IncomeList;
