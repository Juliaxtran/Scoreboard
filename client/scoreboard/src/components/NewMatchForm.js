import React from 'react'
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import {Button} from '@mui/material';

const NewMatchForm = ({handleClose, open, style, handleOpen}) => {

    


  return (
   <>
    <Button size="large" variant="contained" sx={{bgcolor:'#edbe02', mr: 2 }} color="warning" onClick={handleOpen}>Add New Match</Button>
  <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
    Add new Match
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </Typography>
  </Box>
  
</Modal>
   </>
  )
}

export default NewMatchForm; 