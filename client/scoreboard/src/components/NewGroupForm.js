import React, { useState, useContext } from "react";
import {
  Button,
  DialogContent,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Context } from '../context/StateContext';
import axios from "axios";


const NewGroupForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { user } = useContext(Context);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const owner_id = user.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/group/create", { name, owner_id })
      .then((res) => {
       const success = res.status === 200;
        if (success) {
          console.log("Group created successfully");
          setOpen(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      }
      );
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2, mb: 2 }}
        color="warning"
        onClick={handleClickOpen}
      >
        Add A New Group
      </Button>

      {/* Dialog component  */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: 'center' }}> New Group</DialogTitle>
        <DialogContent>

          {/* Name  Text Field */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Name of Group
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="text"
            variant="outlined"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>

        {/* Submit and Cancel Button */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="error" variant="contained" type='submit'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default NewGroupForm;
