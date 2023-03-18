import React from "react";
import { Typography } from "@mui/material";
import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { Context } from "../context/StateContext";

const NewMatchForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

const {players} = useContext(Context)

//list of names in the player array that store in array embbeded in the player object
// needs to be mapped to an array of strings
const playerNames = players.map((player) => player.name);


  return (
    <>
      {/* 'Add New Match' Button Component  */}
      <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2, mb: 2 }}
        color="warning"
        onClick={handleClickOpen}
      >
        {" "}
        Add New Match
      </Button>

      {/* Dialog component  */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}> New Match</DialogTitle>
        <DialogContent>
          {/* Date Text Field */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Date of Match
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            type="date"
            fullWidth
            variant="outlined"
          />

          {/* Add Player Select/Autocomplete component */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Add players
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={playerNames}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a player" />
            )}
          />

          {/* Add new Player Button */}
          <IconButton sx={{ color: "green" }} size="large">
            <AddRoundedIcon />
          </IconButton>
          <span style={{ color: "green" }}>Add a new player</span>

          {/* Add Winner Select/Autocomplete component */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Winner
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={playerNames}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a winner" />
            )}
          />

          {/* Add new Winner Button */}
          <IconButton sx={{ color: "purple" }} size="large">
            <AddRoundedIcon />
          </IconButton>
          <span style={{ color: "purple" }}>Add a new winner</span>
        </DialogContent>

        {/* Submit and Cancel Button */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color="error" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewMatchForm;
