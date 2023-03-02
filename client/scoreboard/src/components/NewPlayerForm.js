import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
  Typography,
  Autocomplete,
} from "@mui/material";

const NewPlayerForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const group = ["Team Fun", "Team 1", "Team Tornado"];

  return (
    <>
      {/* Button Component */}
      <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2 }}
        color="warning"
        onClick={handleClickOpen}
      >
        Add New Player
      </Button>

      {/* Dialog Component  */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{textAlign:'center'}}>New Player</DialogTitle>
        <DialogContent>
          {/* Name Text Field */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Name
          </Typography>
          <TextField autoFocus id="name" type="text" variant="outlined" />

          {/* Email Text Field */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Email
          </Typography>
          <TextField
            autoFocus
            id="email"
            type="email"
            fullWidth
            variant="outlined"
          />

          {/* Group Select/Autocomplete Component */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Group
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={group}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a Group" />
            )}
          />
        </DialogContent>

        <DialogActions>
          
          {/* Submit and Cancel Button */}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color="error" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NewPlayerForm;
