import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Dashboard as DashboardIcon, Receipt as ReceiptIcon, MonetizationOn as MonetizationOnIcon, PieChart as PieChartIcon, BarChart as BarChartIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const drawerWidth = 240;
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', bgcolor: theme.palette.background.default },
      }}
    >
      <Toolbar />
      <List>
        <ListItem component={Link} to="/dashboard" sx={{ py: 1 }}>
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" style={{ color: theme.palette.text.primary }}>
                Dashboard
              </Typography>
            }
          />
        </ListItem>
        <ListItem component={Link} to="/expenses" sx={{ py: 1 }}>
          <ListItemIcon><ReceiptIcon /></ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" style={{ color: theme.palette.text.primary }}>
                Expenses
              </Typography>
            }
          />
        </ListItem>
        <ListItem component={Link} to="/income" sx={{ py: 1 }}>
          <ListItemIcon><MonetizationOnIcon /></ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" style={{ color: theme.palette.text.primary }}>
                Income
              </Typography>
            }
          />
        </ListItem>
        <ListItem component={Link} to="/budget" sx={{ py: 1 }}>
          <ListItemIcon><PieChartIcon /></ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" style={{ color: theme.palette.text.primary }}>
                Budget
              </Typography>
            }
          />
        </ListItem>
        <ListItem component={Link} to="/reports" sx={{ py: 1 }}>
          <ListItemIcon><BarChartIcon /></ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" style={{ color: theme.palette.text.primary }}>
                Reports
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;

