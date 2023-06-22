import React, { useState, useContext } from "react";
import { IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../context/StateContext";
import { Alert } from "@mui/material";

const DeletePlayerButton = ({ error, setError, player }) => {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const { group_id } = useParams();

  const { setPlayers, players, matches } = useContext(Context);

  const handleDeletePlayer = (playerId) => {
    console.log(playerId);
  };

  return (
    <>
      <IconButton sx={{ ml: 22 }} onClick={handleClickOpen}>
        <ClearIcon />
      </IconButton>
      {/* Dialog component  */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this player?"}
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
          {/* Render the appropriate button */}
          <Button
            onClick={() => handleDeletePlayer(player.id)}
            color="error"
            variant="contained"
            type="submit"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeletePlayerButton;
