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
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

const tags = ["Monthly", "One-time", "Quarterly"];

const IncomeModal = ({ open, onClose, onSave, income }) => {
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0], // Default to today's date
    category: "",
    amount: "",
    tags: [],
    notes: "",
  });

  useEffect(() => {
    if (income) {
      setForm({
        ...income,
        amount: income.amount.toString(), // Ensure amount is treated as string for the input
      });
    } else {
      setForm({
        date: new Date().toISOString().split("T")[0], // Default to today's date
        category: "",
        amount: "",
        tags: [],
        notes: "",
      });
    }
  }, [income]);

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
      <DialogTitle>{income ? "Edit Income" : "Add Income"}</DialogTitle>
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

export default IncomeModal;
