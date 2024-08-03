import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemIcon,
  Paper,
  useTheme,
} from "@mui/material";
import ExpenseIcon from "@mui/icons-material/RemoveCircleOutline";
import IncomeIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector } from "react-redux";
import { format, parseISO } from 'date-fns';
import { selectExpenses } from "../features/expenses/expensesSlice"; // Update the import to match your slice
import { selectIncome } from "../features/income/incomeSlice"; // Update the import to match your slice

const RecentTransactions = () => {
  const theme = useTheme();
  const expenses = useSelector((state) => state.expenses.expenses).map(expense => ({ ...expense, type: 'Expense' }));
  const incomes = useSelector((state) => state.income.incomes).map(income => ({ ...income, type: 'Income' }));
  const transactions = [...expenses, ...incomes]
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Paper sx={{ padding: 0, marginTop: 6, maxHeight: 400, overflowY: 'auto' }}>
      <Box sx={{
        position: 'sticky',
        top: 0,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1,
        padding: 2,
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Typography variant="h6" color="textPrimary">Recent Transactions</Typography>
      </Box>
      <List>
        {transactions.map((transaction) => (
          <React.Fragment key={transaction._id}>
            <ListItem>
              <ListItemIcon>
                {transaction.type === "Expense" ? (
                  <ExpenseIcon sx={{ color: theme.palette.error.main }} />
                ) : (
                  <IncomeIcon sx={{ color: theme.palette.primary.main }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={`${transaction.type}: ${transaction.amount}`}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="textPrimary">
                      {`Category: ${transaction.category}  |  Date: ${format(parseISO(transaction.date), 'yyyy-MM-dd')}`}
                    </Typography>
                    {transaction.tag && (
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
    </Paper>
  );
};

export default RecentTransactions;
