import React from 'react'
import {Button, Dialog, DialogActions, TextField, DialogContentText, DialogTitle, DialogContent} from '@mui/material';


const NewPlayerForm = () => {

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
  return (
    <>
    <Button
    size="large"
    variant="contained"
    sx={{ bgcolor: "#edbe02", mr: 2 }}
    color="warning"
    onClick={handleClickOpen}
  >
    Add New Player
  </Button>
  {/* <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
      Add new Player
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  </Modal> */}

<Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Player</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="group"
            label="Group"
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

export default NewPlayerForm; 