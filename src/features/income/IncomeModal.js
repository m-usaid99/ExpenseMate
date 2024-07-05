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
  "Investments",
  "Healthcare",
  "Education",
  "Shopping",
  "Travel",
  "Miscellaneous",
];
const tags = ["Monthly", "One-time", "Recurring"];

const IncomeModal = ({ open, onClose, onSave, income }) => {
  const [form, setForm] = useState({
    date: "",
    category: categories[0], // Default to the first built-in category
    amount: "",
    tags: [],
    notes: "",
  });

  useEffect(() => {
    if (income) {
      setForm({
        ...income,
        tags: Array.isArray(income.tags) ? income.tags : [],
      });
    } else {
      setForm({
        date: "",
        category: categories[0], // Default to the first built-in category
        amount: "",
        tags: [],
        notes: "",
      });
    }
  }, [income]);

  const handleChange = (field, value) => {
    if (field === "tags") {
      value = Array.isArray(value) ? value : value.split(",");
    }
    setForm((prevForm) => ({ ...prevForm, [field]: value }));
  };

  const handleSave = () => {
    onSave(form);
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
          onChange={(e) => handleChange("tags", e.target.value)}
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
