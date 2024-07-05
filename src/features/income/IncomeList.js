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
import { Edit, Delete } from "@mui/icons-material";
import { Payment, Category } from "@mui/icons-material"; // Example icons

const categoryIcons = {
  Salary: <Payment />,
  Freelance: <Category />,
  Investments: <Category />,
  Other: <Category />,
  Healthcare: <Category />,
  Education: <Category />,
  Shopping: <Category />,
  Travel: <Category />,
  Miscellaneous: <Category />,
};

const IncomeList = ({ income, onEdit, onDelete }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-start", marginTop: 2 }}>
      <TableContainer component={Paper} sx={{ width: "80%" }}>
        <Table>
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
                <TableCell>{inc.tags.join(", ")}</TableCell>
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
