import React from "react";
import {
  Button,
  DialogContent,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  useMediaQuery
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";



const NewGameForm = ({setError}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

const { group_id } = useParams();
const [name, setName] = React.useState("");
const [description, setDescription] = React.useState("");






  //add game to a group
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/game/add/${group_id}`, { name, description})
      .then((res) => {
        const success = res.status === 200;
        if (success) {
          setError('Success');
          console.log("Add Game to group successfully");
          window.location.reload();
          setOpen(false);

        }
      })
      .catch((error) => {
        setError('Game not created, please try again');
        console.log(error);
      });
  };



  return (
    <>
    <form onSubmit={handleSubmit}>
      <Button
       size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", ml: 1, mb: 2  }}
        color="warning"
        onClick={handleClickOpen}
      >
        Add New Game
      </Button>

      {/* Dialog component  */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{textAlign:'center'}}> New Game</DialogTitle>
        <DialogContent>

          {/* Name  Text Field */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Name
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Name"
            type="text"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />

          {/* Description Text Field */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
           Description
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            label="Add a description"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>

        {/* Submit and Cancel Button */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="error" variant="contained" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </>
  );
};

export default NewGameForm;
