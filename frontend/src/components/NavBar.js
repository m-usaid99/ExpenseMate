// src/components/NavBar.js
import React, { useState } from "react";
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
import SettingsModal from "./SettingsModal"; // Adjust the import path accordingly
import { useDispatch } from "react-redux";
import { logout } from '../features/user/userSlice';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
    handleMenuClose();
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleLogout = () => {
    // Add logout logic here
    dispatch(logout());
    setAnchorEl(null);
  };

  return (
    <>
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
            <MenuItem onClick={handleSettingsOpen}>
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
      <SettingsModal open={settingsOpen} handleClose={handleSettingsClose} />
    </>
  );
};

export default NavBar;
