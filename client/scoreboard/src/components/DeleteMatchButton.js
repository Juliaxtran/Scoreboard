import React, { useContext, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from '../context/StateContext';

const DeleteMatchButton = ({match}) => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const { group_id } = useParams();
  const { setMatches, matches } = useContext(Context);

  const handleDelete = (matchId) => {
    axios.delete(`http://localhost:4000/match/${group_id}/${matchId}`)
      .then((res) => {
        if (res.status === 200) {
          const updatedMatches = matches.filter((match) => match.match_id !== matchId);
          setMatches(updatedMatches);
          handleClose();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <IconButton sx={{ ml: 35 }} onClick={handleClickOpen}><ClearIcon /></IconButton>
      {/* Dialog component  */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this match ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To confirm, click on the delete button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
          <Button onClick={() => matches && handleDelete(match.match_id)} color="error" variant="contained" type="submit">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteMatchButton;