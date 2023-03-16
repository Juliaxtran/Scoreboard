import React from "react";
import {
  Button,
  DialogContent,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
} from "@mui/material";

const NewGroupForm = () => {
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
        sx={{ bgcolor: "#edbe02", mr: 2, mb: 2  }}
        color="warning"
        onClick={handleClickOpen}
      >
        Add A New Group
      </Button>

      {/* Dialog component  */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{textAlign:'center'}}> New Group</DialogTitle>
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
            type="text"
            variant="outlined"
          />
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

export default NewGroupForm;
