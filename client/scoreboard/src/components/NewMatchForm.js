import React from 'react'
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import {Button, Dialog, DialogActions, TextField, DialogContentText, DialogTitle, DialogContent} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


const NewMatchForm = ({}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };


  const player = ["Julia", "Patrice", "Ryan"]; 

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
      </Modal> */}
      
      {/* 'Add New Match' Button Component  */}
      <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2 }}
        color="warning"
        onClick={handleClickOpen}
      > Add New Match
      </Button>
    
      {/* Dialog component  */}
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
         
         <Typography variant='h6' sx={{fontWeight: 'bold', fontFamily: 'JetBrains Mono, monospace'}}>Add players</Typography>
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={player}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select a player" />}
    />
             <Typography variant='h6' sx={{fontWeight: 'bold', fontFamily: 'JetBrains Mono, monospace'}}>Winner</Typography>
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={player}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Select a winner" />}
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