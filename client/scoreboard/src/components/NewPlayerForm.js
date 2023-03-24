import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,
  DialogContent,
  Typography,
  Tooltip
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/StateContext";


const NewPlayerForm = () => {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

const { players, setPlayers} = useContext(Context)

const { group_id } = useParams();




  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:4000/group/add/${group_id}`, { email });
    const success = res.status === 200;
    if (success) {
      console.log("Add player to group successfully!");
      axios.get(`http://localhost:4000/group/players/${group_id}`)
        .then((response) => {
          console.log("response", response.data.players);
          const newPlayers = response.data.players;
          setPlayers(newPlayers);
                setOpen(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      {/* Button Component */}
      <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2, mb: 2  }}
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
