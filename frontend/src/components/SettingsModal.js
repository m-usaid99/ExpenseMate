// src/components/SettingsModal.js
import React from 'react';
import { Modal, Box, Typography, Switch, FormControlLabel, TextField, MenuItem } from '@mui/material';
import { useTheme } from '../ThemeContext';

const SettingsModal = ({ open, handleClose }) => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="settings-modal-title"
      aria-describedby="settings-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="settings-modal-title" variant="h6" component="h2">
          Settings
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              name="themeToggle"
              color="primary"
            />
          }
          label="Switch To Dark Mode"
          sx={{marginTop: 1}}
        />
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Notifications</Typography>
          <TextField
            disabled
            placeholder="Placeholder for Notification Settings"
            fullWidth
            margin="normal"
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">Currency</Typography>
          <TextField
            select
            fullWidth
            value=""
            disabled
            margin="normal"
          >
            <MenuItem value="">
              Placeholder for Currency Selection
            </MenuItem>
          </TextField>
        </Box>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
