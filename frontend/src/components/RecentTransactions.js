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
import { selectRecentExpenses } from "../features/expenses/expensesSlice";
import { selectRecentIncome } from "../features/income/incomeSlice";

const RecentTransactions = () => {
  const recentExpenses = useSelector(selectRecentExpenses).map(expense => ({ ...expense, type: 'Expense' }));
  const recentIncome = useSelector(selectRecentIncome).map(income => ({ ...income, type: 'Income' }));
  const transactions = [...recentExpenses, ...recentIncome]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box sx={{ mt: 6, maxHeight: 500, overflowY: 'auto' }}>
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
                        {`  |  Tags: ${transaction.tags.join(', ')}`}
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
