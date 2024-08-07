import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileAsync } from '../features/user/userSlice';

const ProfileModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSave = () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match!');
      return;
    }
    setMessage('');
    setConfirmationOpen(true);
  };

  const handleConfirmSave = () => {
    const updatedProfile = {
      name,
      email,
      password: password ? password : undefined,
    };
    dispatch(updateUserProfileAsync(updatedProfile));
    setConfirmationOpen(false);
    handleClose();
  };

  const handleCancel = () => {
    setConfirmationOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="profile-modal-title"
        aria-describedby="profile-modal-description"
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
          <Typography id="profile-modal-title" variant="h6" component="h2">
            Update Profile
          </Typography>
          {message && (
            <Typography color="error" sx={{ mt: 1 }}>
              {message}
            </Typography>
          )}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            fullWidth
            margin="normal"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      <Dialog
        open={confirmationOpen}
        onClose={handleCancel}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Profile Update</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to update your profile details?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSave} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;

