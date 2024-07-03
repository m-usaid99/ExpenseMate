// src/components/NavBar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Logout from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ExpenseMate
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="profile"
          aria-controls="profile-menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              width: "200px", // Adjust the width as needed
              transform: "translateX(-20px)", // Adjust the position as needed
            },
          }}
        >
          <MenuItem component={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuItem component={Link} to="/settings">
            Settings
          </MenuItem>
          <MenuItem>
            <Button
              startIcon={<Logout />}
              onClick={handleLogout}
              sx={{ width: "100%", justifyContent: "flex-start" }}
            >
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
