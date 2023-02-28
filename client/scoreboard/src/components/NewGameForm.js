import React from 'react'
import { Button, Modal, Box, Typography } from '@mui/material';

const NewGameForm = ({handleClose, handleOpen, open, style}) => {
  return (
    <>
    <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2 }}
        color="warning"
        onClick={handleOpen}
      >
        Add New Game
      </Button>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
       Add New Game
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
      </>
  )
}

export default NewGameForm; 