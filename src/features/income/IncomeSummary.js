import React from "react";
import { Typography, Paper } from "@mui/material";

const IncomeSummary = ({ totalIncome }) => {
    return (
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h5">Total Income (Last 12 Months)</Typography>
            <Typography variant="h4">${totalIncome}</Typography>
        </Paper>
    );
};

export default IncomeSummary;