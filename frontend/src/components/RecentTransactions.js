// src/components/RecentTransactions.js
import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
} from "@mui/material";
import ExpenseIcon from "@mui/icons-material/RemoveCircleOutline";
import IncomeIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";

const RecentTransactions = () => {
  const expenses = useSelector((state) => state.expenses.expenses).map(expense => ({ ...expense, type: 'Expense' }));
  const incomes = useSelector((state) => state.income.incomes).map(income => ({ ...income, type: 'Income' }));
  const transactions = [...expenses, ...incomes]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box sx={{ mt: 6, maxHeight: 400, overflowY: 'auto' }}>
      <Typography variant="h6">Recent Transactions</Typography>
      <List>
        {transactions.map((transaction) => (
          <React.Fragment key={transaction.id}>
            <ListItem>
              <ListItemIcon>
                {transaction.type === "Expense" ? (
                  <ExpenseIcon color="error" />
                ) : (
                  <IncomeIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText
                primary={`${transaction.type}: ${transaction.amount}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {`Category: ${transaction.category}  |  Date: ${transaction.date}`}
                    </Typography>
                    {transaction.tags && transaction.tags.length > 0 && (
                      <Typography component="span" variant="body2" color="textSecondary">
                        {`  |  Tag: ${transaction.tag}`}
                      </Typography>
                    )}
                    {transaction.notes && (
                      <Typography component="span" variant="body2" color="textSecondary">
                        {` | Notes: ${transaction.notes}`}
                      </Typography>
                    )}
                  </>
                }
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
