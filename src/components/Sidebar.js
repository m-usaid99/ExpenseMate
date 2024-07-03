// src/components/Sidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PieChartIcon from '@mui/icons-material/PieChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItem component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/expenses">
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          <ListItemText primary="Expenses" />
        </ListItem>
        <ListItem component={Link} to="/income">
          <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
          <ListItemText primary="Income" />
        </ListItem>
        <ListItem component={Link} to="/budget">
          <ListItemIcon><PieChartIcon /></ListItemIcon>
          <ListItemText primary="Budget" />
        </ListItem>
        <ListItem component={Link} to="/reports">
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
        <ListItem component={Link} to="/categories">
          <ListItemIcon><CategoryIcon /></ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
