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
import { addIncomeAsync, updateIncomeAsync } from "./incomeSlice";
import { format, parseISO } from "date-fns";

const categories = [
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

const tags = ["monthly", "one-time", "quarterly"];

const IncomeModal = ({ open, onClose, income }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    date: format(new Date(), "yyyy-MM-dd"),
    category: "",
    amount: "",
    tag: "",
    notes: "",
  });

  useEffect(() => {
    if (income) {
      setForm({
        date: format(parseISO(income.date), "yyyy-MM-dd"),
        category: income.category || "", // Ensure category is set or default to empty string
        amount: income.amount.toString(), // Ensure amount is treated as string for the input
        tag: income.tag || "", // Ensure tag is set or default to empty string
        notes: income.notes || "", // Ensure notes are set or default to empty string      
      });
    } else {
      setForm({
        date: new Date().toISOString().split("T")[0], // Default to today's date
        category: "",
        amount: "",
        tag: "",
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
      tag: e.target.value,
    }));
  };

  const handleSave = () => {
    const incomeData = {
      ...form,
      amount: parseFloat(form.amount), // Ensure amount is a number on save
      date: parseISO(form.date).toISOString(), // Ensure date is properly formatted
    };

    // Validate data before dispatching
    if (!incomeData.category || !incomeData.amount || !incomeData.date) {
      alert("Please fill in all required fields");
      return;
    }

    if (income) {
      dispatch(updateIncomeAsync({ id: income._id, incomeData }));
    } else {
      dispatch(addIncomeAsync(incomeData));
    }
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
          label="Tag"
          value={form.tag}
          onChange={handleTagChange}
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

export default IncomeModal;
