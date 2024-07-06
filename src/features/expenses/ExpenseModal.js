import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const categories = [
  "Food",
  "Rent",
  "Utilities",
  "Entertainment",
  "Transportation",
  "Healthcare",
  "Education",
  "Insurance",
  "Clothing",
  "Savings",
  "Travel",
  "Household",
  "Gifts",
  "Dining Out",
  "Miscellaneous",
];

const tags = ["Monthly", "One-time", "Recurring"];

const ExpenseModal = ({ open, onClose, onSave, expense }) => {
  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    tags: [],
    notes: "",
    isRecurring: false,
  });

  useEffect(() => {
    if (expense) {
      setForm({
        ...expense,
        amount: expense.amount.toString(), // Ensure amount is treated as string for the input
      });
    } else {
      setForm({
        date: "",
        category: "",
        amount: "",
        tags: [],
        notes: "",
        isRecurring: false,
      });
    }
  }, [expense]);

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: field === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleTagChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      tags: e.target.value,
    }));
  };

  const handleSave = () => {
    onSave({
      ...form,
      amount: parseFloat(form.amount), // Ensure amount is a number on save
    });
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
          label="Tags"
          value={form.tags}
          onChange={handleTagChange}
          fullWidth
          margin="normal"
          variant="outlined"
          SelectProps={{ multiple: true }}
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
        <FormControlLabel
          control={
            <Checkbox
              checked={form.isRecurring}
              onChange={(e) => handleChange("isRecurring", e.target.checked)}
            />
          }
          label="Recurring"
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
