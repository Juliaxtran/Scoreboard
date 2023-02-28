import React from 'react'
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import {Button, Dialog, DialogActions, TextField, DialogContentText, DialogTitle, DialogContent} from '@mui/material';

const NewMatchForm = ({}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
   <>
   {/* 
       
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Match
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}<Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2 }}
        color="warning"
        onClick={handleClickOpen}
      > Add New Match
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Match</DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Date of match"
            type="date"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="players"
            label="Players"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="winner"
            label="Winner"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color="error" variant='contained'>Submit</Button>
        </DialogActions>
      </Dialog>
   </>
  )
}

export default NewMatchForm; 