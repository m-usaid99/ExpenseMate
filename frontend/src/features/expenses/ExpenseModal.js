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

const tags = ["Monthly", "One-time", "Recurring"];

const ExpenseModal = ({ open, onClose, onSave, expense }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    category: "",
    amount: "",
    tags: "",
    notes: "",
  });

  useEffect(() => {
    if (expense) {
      setForm({
        ...expense,
        amount: expense.amount.toString(), // Ensure amount is treated as string for the input
      });
    } else {
      setForm({
        date: new Date().toISOString().split("T")[0],
        category: "",
        amount: "",
        tags: "",
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
          onChange={(e) => handleChange("tags", e.target.value)}
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
