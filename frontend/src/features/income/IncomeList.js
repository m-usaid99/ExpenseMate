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
import { format, parseISO } from 'date-fns';

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
              <TableCell>Tag</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {income.map((inc) => (
              <TableRow key={inc._id} sx={{ fontSize: "1rem" }}>
                <TableCell>{format(parseISO(inc.date), 'yyyy-MM-dd')}</TableCell>
                <TableCell>
                  {categoryIcons[inc.category] ||
                    categoryIcons["Miscellaneous"]}{" "}
                  {inc.category}
                </TableCell>
                <TableCell>{inc.amount}</TableCell>
                <TableCell>{inc.tag}</TableCell>
                <TableCell>{inc.notes}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(inc)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(inc._id)}>
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
