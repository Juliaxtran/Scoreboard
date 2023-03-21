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
import axios from "axios";
import { useParams } from "react-router-dom";

const NewMatchForm = () => {
  const { group_id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [newPlayer, setNewPlayer] = useState([]);
  const [newWinner, setNewWinner] = useState([]);
  const [newGameId, setNewGameId] = useState(null);
  const [date, setDate] = useState(null);

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const {
    players,
    handleAddPlayer,
    playerVal,
    handleDeletePlayer,
    winnerVal,
    handleAddWinner,
    handleDeleteWinner,
    games,
    setMatches,
    matches,
    setGames,
  } = useContext(Context);

  //list of names in the player array that store in array embbeded in the player object
  // needs to be mapped to an array of strings

  let playerNames = [];
  if (Array.isArray(players) && players.length) {
    playerNames = players.map((player) => player.name);
  } else {
    playerNames = [];
  }
  console.log(players)

  console.log(newGameId, games, "hey", newPlayer);

  let gameNames = [];
  let gameId = [];
  if (Array.isArray(games) && games.length) {
    gameNames = games.map((game) => game.name);
    gameId = games.map((game) => game.id);
    console.log("gameNames", gameNames);
  } else {
    console.log("games is empty or not an array");
  }

  //handleAddNewPlayer function to add new player to the newPlayer array
  const handleAddNewPlayer = (value) => {
    setNewPlayer((prevPlayers) => [...prevPlayers, value]);
  };

  const handleAddNewWinner = (index, value) => {
    const newWinnerCopy = [...newWinner];
    newWinnerCopy[index] = value;
    setNewWinner(newWinnerCopy);
  };

  const handleDeleteNewPlayer = (index) => {
    const newPlayersCopy = [...newPlayer];
    newPlayersCopy.splice(index, 1);
    setNewPlayer(newPlayersCopy);
  };


console.log('new player needs to be a list of players',newPlayer)

  // const handleAddMatch = (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     newGameId,
  //     date,
  //     newPlayer,
  //   };
  //   console.log("yo", payload);
  //   axios
  //     .post(`http://localhost:4000/match/${group_id}`, payload, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       const success = res.status === 200;
  //       if (success) {
  //         console.log("Add match successfully!");
  //         setOpen(false);
  //         setMatches(res.data.matches);
  //         console.log(res.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  console.log("list", newGameId);

  return (
    <>
      <form>
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
              sx={{
                fontWeight: "bold",
                fontFamily: "JetBrains Mono, monospace",
              }}
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
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />

            {/* Add  Game/Autocomplete component */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              Add Game
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={gameNames}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Select a game" />
              )}
              onChange={(event, value) => {
                const selectedGameIndex = gameNames.indexOf(value);
                const selectedGameId = gameId[selectedGameIndex];
                setNewGameId(selectedGameId);
              }}
            />

            {/* Add Player Select/Autocomplete component */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                fontFamily: "JetBrains Mono, monospace",
              }}
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
              onChange={(event, value) => handleAddNewPlayer(value)}
            />

            {playerVal.map((player, index) => (
              <div key={`${player.id}-${index}`} className="new-fields">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={playerNames}
                  getOptionLabel={(option) => option}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a player" />
                  )}
                  onChange={(event, value) => handleAddNewPlayer(value)}
                />
                <IconButton
                  sx={{ color: "green" }}
                  size="large"
                  onClick={() => handleDeleteNewPlayer(player.id)}
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
              sx={{
                fontWeight: "bold",
                fontFamily: "JetBrains Mono, monospace",
              }}
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
              onChange={(event, value) => handleAddNewWinner(value)}
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
                     handleAddNewWinner(value)
                  }
                />

                <IconButton
                  sx={{ color: "purple" }}
                  size="large"
                  onClick={() => handleDeleteWinner(winner.id)}
                >
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
            <Button
    
              color="error"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};

export default NewMatchForm;