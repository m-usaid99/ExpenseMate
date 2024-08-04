// src/components/SettingsModal.js
import React from 'react';
import { Modal, Box, Typography, Switch, FormControlLabel, TextField, MenuItem, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme, updateUserSettingsAsync } from '../features/user/userSlice';

const SettingsModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.user.theme);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleSaveSettings = () => {
    dispatch(updateUserSettingsAsync({ theme: mode }));
    handleClose();
  };

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
              onChange={handleToggleTheme}
              name="themeToggle"
              color="primary"
            />}
          label="Switch To Dark Mode"
          sx={{ marginTop: 1 }}
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSettings}
          sx={{ mt: 3 }}
        >
          Save Settings
        </Button>
      </Box>
    </Modal>
  );
};

export default SettingsModal;
