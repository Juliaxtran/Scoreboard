import React, { useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
  TextField,
} from "@mui/material";
import react from "react";
import { Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../context/StateContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

const UpdateMatchButton = ({ match, setError }) => {
  const { group_id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [winner, setWinner] = useState([]);
  const [game_id, setGame_id] = useState(null);
  const [date, setDate] = useState(null);
  const [selectedPlayerIds, setSelectedPlayerIds] = useState([]);
  const isMobile = useMediaQuery("(max-width:450px)");

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);


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
    setPlayerVal,
  } = useContext(Context);



  //the list of players in the match is a string, convert to array
  const playerNamesArray = match.player_names.split(', ');
//Modify the handle function to update the player to the match
const handleUpdateNewPlayer = () => {
  console.log('being clicked ')
    const abc = [...playerNamesArray, []]
    setPlayerVal(abc)
  };
  //list of names in the player array that store in array embbeded in the player object

  let playerNames = [];
  let playerIds = [];
  if (Array.isArray(players) && players.length) {
    playerNames = players.map((player) => player.name);
    playerIds = players.map((player) => player.id);
  }

  let gameNames = [];
  let gameId = [];
  if (Array.isArray(games) && games.length) {
    gameNames = games.map((game) => game.name);
    gameId = games.map((game) => game.id);
  }

  const handleAddNewWinner = (name) => {
    const id = playerIds[playerNames.indexOf(name)];
    setWinner([...winner, id]);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    console.log("date", date);
    console.log("selectedPlayerIds", selectedPlayerIds);
    console.log("gameId", game_id);
    console.log("Winner", winner);

    const playerData = selectedPlayerIds.map((id) => ({
      id,
      is_winner: winner.includes(id),
    }));

    console.log(playerData);

    const payload = {
      game_id,
      date,
      players: playerData,
    };
    console.log("PlayLoad", payload);
    axios
      .post(`http://localhost:4000/match/${group_id}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        const success = res.status === 200;
        if (success) {
          setError("Success");
          setMatches(res.data.matches);
          setOpen(false);
          window.location.reload();
        }
      })
      .catch((error) => {
        setError("Match not created, please try again");
        console.error(error);
      });
  };

  const handleUpdate = (matchId) => {
    console.log(matchId);
  };

  return (
    <>
      <IconButton sx={{ ml: 35 }} onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
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
            value={new Date(match.played_on).toLocaleDateString("en-CA")}
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
              setGame_id(selectedGameId);
            }}
            value={match.game_name}
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
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={playerNames}
            sx={{ width: 300, mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a player" />
            )}
            onChange={(event, value) =>
              setSelectedPlayerIds([
                ...selectedPlayerIds,
                playerIds[playerNames.indexOf(value)],
              ])
            }
            //   not good
            //want only the first player name
            value={playerNamesArray[0]}
          /> */}



           {playerNamesArray.map((name, index) => (
            <div key={`${name.id}-${index}`} className="new-fields">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={playerNamesArray}
                sx={{ width: 300, mb: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label={`Player ${index + 1}`} />
                )}
                onChange={(event, value) =>
                  setSelectedPlayerIds([
                    ...selectedPlayerIds,
                    playerIds[playerNames.indexOf(value)],
                  ])
                }
                value={name}
              />
              <IconButton
                sx={{ color: "green" }}
                size="large"
                onClick={() => handleDeletePlayer(index)}
              >
                <DeleteIcon />
          
              </IconButton>
            </div>
          ))} 

{/* Add player empty  field */}
{playerVal.map((player, index) => (
              <div key={`${player.id}-${index}`} className="new-fields">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={playerNames}

                  sx={{ width: 300 ,  mb:2 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a player" />
                  )}
                  onChange={(event, value) => setSelectedPlayerIds([...selectedPlayerIds, playerIds[playerNames.indexOf(value)]])}
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
            value={winner[0]}
            sx={{ width: 300, mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Select a winner" />
            )}
            onChange={(event, value) => handleAddNewWinner(value)}
            defaultValue={match.winners}
          />

          {winnerVal.map((winner, index) => (
            <div key={`${winner.id}-${index}`} className="new-fields">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={playerNames}
                value={
                  winner[index]
                    ? playerNames[playerIds.indexOf(winner[index])]
                    : ""
                }
                sx={{ width: 300, mb: 2 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select a winner" />
                )}
                onChange={(event, value) => handleAddNewWinner(value)}
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
            onClick={handleUpdateSubmit}
          >
           Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateMatchButton;
