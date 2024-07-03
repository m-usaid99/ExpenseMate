// src/components/RecentTransactions.js
import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, ListItemIcon } from '@mui/material';
import ExpenseIcon from '@mui/icons-material/RemoveCircleOutline';
import IncomeIcon from '@mui/icons-material/AddCircleOutline';

const transactions = [
  { id: 1, type: 'Expense', amount: '$50', category: 'Groceries', date: '2023-07-01' },
  { id: 2, type: 'Income', amount: '$500', category: 'Salary', date: '2023-07-01' },
  { id: 3, type: 'Expense', amount: '$20', category: 'Transport', date: '2023-07-02' },
  { id: 4, type: 'Income', amount: '$150', category: 'Freelance', date: '2023-07-02' },
  // Add more transactions here
];

const RecentTransactions = () => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">Recent Transactions</Typography>
      <List>
        {transactions.map((transaction) => (
          <React.Fragment key={transaction.id}>
            <ListItem>
              <ListItemIcon>
                {transaction.type === 'Expense' ? <ExpenseIcon color="error" /> : <IncomeIcon color="primary" />}
              </ListItemIcon>
              <ListItemText
                primary={`${transaction.type}: ${transaction.amount}`}
                secondary={`Category: ${transaction.category} | Date: ${transaction.date}`}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default RecentTransactions;
