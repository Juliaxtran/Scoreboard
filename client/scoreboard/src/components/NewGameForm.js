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
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";



const NewGameForm = () => {
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
      .post(`http://localhost:4000/game/add/${group_id}`, { name, description})
      .then((res) => {
        const success = res.status === 200;
        if (success) {
          console.log("Add Game to group successfully");
          window.location.reload();
          setOpen(false);

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   const res = await axios.post(`http://localhost:4000/game/add/${group_id}`, { name, description});
//   const success = res.status === 200;
//   if (success) {
//     console.log("Game added to group successfully!");
//     await axios.get(`http://localhost:4000/game/all/${group_id}`)
//       .then((response) => {
//         console.log("response", response.data.games);
//         const newGames = response.data.games;
//         setGames(newGames);
//         console.log(newGames);
//         setOpen(false);
//         window.location.reload();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const res = await axios.post(`http://localhost:4000/game/add/${group_id}`, { name, description});
//   const success = res.status === 200;
//   if (success) {
//     console.log("Game added to group successfully!");
//     await axios.get(`http://localhost:4000/game/all/${group_id}`)
//       .then((response) => {
//         console.log("response", response.data.games);
//         const newGames = response.data.games;
//         setGames(newGames);
//         console.log(newGames);
//         setOpen(false);
//         navigate(`/dashboard/${group_id}`); // use navigate instead of history.push
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <Button
        size="large"
        variant="contained"
        sx={{ bgcolor: "#edbe02", mr: 2, mb: 2  }}
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
