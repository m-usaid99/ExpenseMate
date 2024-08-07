import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addExpenseAsync, updateExpenseAsync } from "./expensesSlice";
import { format, parseISO } from "date-fns";

const categories = [
  "Food",
  "Rent",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Healthcare",
  "Education",
  "Commute",
  "Insurance",
  "Shopping",
  "Travel",
  "Grocery",
  "Miscellaneous",
];

const tags = ["monthly", "one-time", "recurring"];

const ExpenseModal = ({ open, onClose, expense }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    category: "",
    amount: "",
    tag: "",
    notes: "",
  });

  useEffect(() => {
    if (expense) {
      setForm({
        date: format(parseISO(expense.date), "yyyy-MM-dd"),
        category: expense.category || "", // Ensure category is set or default to empty string
        amount: expense.amount.toString(), // Ensure amount is treated as string for the input
        tag: expense.tag || "", // Ensure tag is set or default to empty string
        notes: expense.notes || "", // Ensure notes are set or default to empty string
      });
    } else {
      setForm({
        date: format(new Date(), "yyyy-MM-dd"),
        category: "",
        amount: "",
        tag: "",
        notes: "",
      });
    }
  }, [expense]);

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: field === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSave = () => {
    const expenseData = {
      ...form,
      amount: parseFloat(form.amount), // Ensure amount is a number on save
      date: parseISO(form.date).toISOString(), // Ensure date is properly formatted
    };

    // Validate data before dispatching
    if (!expenseData.category || !expenseData.amount || !expenseData.date) {
      alert("Please fill in all required fields");
      return;
    }

    if (expense) {
      dispatch(updateExpenseAsync({ id: expense._id, expenseData }));
    } else {
      dispatch(addExpenseAsync(expenseData));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{expense ? "Edit Expense" : "Add Expense"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) => handleChange("date", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          select
          label="Category"
          value={form.category}
          onChange={(e) => handleChange("category", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          select
          label="Tag"
          value={form.tag}
          onChange={(e) => handleChange("tag", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          {tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Notes"
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExpenseModal;

