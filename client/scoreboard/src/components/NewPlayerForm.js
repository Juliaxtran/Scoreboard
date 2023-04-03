import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
  Typography,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { useParams} from "react-router-dom";



const NewPlayerForm = ({setError}) => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
 const isMobile = useMediaQuery("(max-width:450px)");

const { group_id } = useParams();



const handleSubmit = (e) => {
  e.preventDefault();
  axios
    .post(`http://localhost:4000/group/add/${group_id}`, { email})
    .then((res) => {
      const success = res.status === 200;
      if (success) {
        setError('Success');
        console.log("Player successfully added to group!");
        setOpen(false);
        window.location.reload();
      }
    })
    .catch((error) => {
      console.log(error);
      setError('Player not added to group! Make sure the player has an account.')
    });
};

  return (
    <>
    <form onSubmit={handleSubmit}>
      {/* Button Component */}
      <Button
        size={isMobile ? "small" : "large"}
        variant="contained"
        sx={{ bgcolor: "#edbe02", ml: 1, mb: 2  }}
        color="warning"
        onClick={handleClickOpen}
      >
        Add New Player
      </Button>

      {/* Dialog Component  */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{textAlign:'center'}}>New Player</DialogTitle>
        <DialogContent>
        <Tooltip title={<Typography style={{fontSize:'15px'}}>Enter the player's email. Player needs to have an account.</Typography> } placement="top">
            <IconButton><InfoIcon/></IconButton>
          </Tooltip>
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
            onChange={(e) => setEmail(e.target.value)}
          />

        </DialogContent>

        <DialogActions>

          {/* Submit and Cancel Button */}
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

export default NewPlayerForm;
