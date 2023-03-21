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
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext, useState } from "react";
import { Context } from "../context/StateContext";

const NewMatchForm = () => {
  const [open, setOpen] = React.useState(false);
  const [newPlayer, setNewPlayer] = useState([]);
  const [newWinner, setNewWinner] = useState([]);
  const [newGame, setNewGame] = useState([]);
  const {
    players,
    handleAddPlayer,
    playerVal,
    handleDeletePlayer,
    winnerVal,
    handleAddWinner,
    handleDeleteWinner,
    games,
  } = useContext(Context);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };


  //list of names in the player array that store in array embbeded in the player object
  // needs to be mapped to an array of strings
  const playerNames = players.map((player) => player.name);

  //handleAddNewPlayer function to add new player to the newPlayer array
  const handleAddNewPlayer = (index, value) => {
    const newPlayersCopy = [...newPlayer];
    newPlayersCopy[index] = value;
    setNewPlayer(newPlayersCopy);
  };

  const handleAddNewWinner = (index, value) => {
    const newWinnerCopy = [...newWinner];
    newWinnerCopy[index] = value;
    setNewWinner(newWinnerCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("newPlayer", newPlayer, "newWinner", newWinner, "newGame", newGame);
  };



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
      <form onSubmit={handleSubmit}>
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

          {/* Select a game */}
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontFamily: "JetBrains Mono, monospace" }}
          >
            Select a game
          </Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={games.map((game) => game.name)}
            value={newGame}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a game" />
            )}
            onChange={(event, value) => setNewGame(value)}
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
            value={newPlayer[0]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a player" />
            )}
            onChange={(index, value) => handleAddNewPlayer(index, value)}
          />

          {playerVal.map((player, index) => (
            <div key={`${player.id}-${index}`} className="new-fields">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={playerNames}
                value={newPlayer[index]}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select a player" />
                )}
                onChange={(event, value) =>
                  handleAddNewPlayer(index, event.target.value)
                }
              />
              <IconButton
                sx={{ color: "green" }}
                size="large"
                onClick={() => handleDeletePlayer(player.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

          {/* Add new Player Button */}
          <IconButton
            sx={{ color: "green" }}
            size="large"
            onClick={() => handleAddPlayer()}
          >
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
            value={newWinner[0]}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a winner" />
            )}
            onChange={(index, value) =>
              handleAddNewWinner(index, value)
            }
          />

          {winnerVal.map((winner, index) => (
            <div key={`${winner.id}-${index}`} className="new-fields">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={playerNames}
                value={newWinner[index]}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select a winner" />
                )}
                onChange={(event, value) =>
                  handleAddNewPlayer(index, event.target.value)
                }
              />

              <IconButton sx={{ color: "purple" }} size="large" onClick={() => handleDeleteWinner(winner.id)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}

          {/* Add new Winner Button */}
          <IconButton
            sx={{ color: "purple" }}
            size="large"
            onClick={handleAddWinner}
          >
            <AddRoundedIcon />
          </IconButton>
          <span style={{ color: "purple" }}>Add a new winner</span>
        </DialogContent>

        {/* Submit and Cancel Button */}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose} color="error" variant="contained" type='submit'>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </>
  );
};

export default NewMatchForm;
