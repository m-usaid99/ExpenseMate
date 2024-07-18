import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { Edit, Delete, AttachMoney, Computer, LocalAtm, Category } from "@mui/icons-material";

const categoryIcons = {
  Salary: <AttachMoney />,
  Freelance: <Computer />,
  Investment: <LocalAtm />,
  Other: <Category />,
};

const IncomeList = ({ income, onEdit, onDelete }) => {
  return (
    <Box sx={{ display: "flex", marginTop: 2 }}>
      <TableContainer component={Paper} sx={{ width: "100%", maxHeight: 400, overflow: 'auto' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {income.map((inc) => (
              <TableRow key={inc.id} sx={{ fontSize: "1rem" }}>
                <TableCell>{inc.date}</TableCell>
                <TableCell>
                  {categoryIcons[inc.category] ||
                    categoryIcons["Miscellaneous"]}{" "}
                  {inc.category}
                </TableCell>
                <TableCell>{inc.amount}</TableCell>
                <TableCell>{inc.tags}</TableCell>
                <TableCell>{inc.notes}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(inc)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(inc.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default IncomeList;
