import React, { useContext, useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Context } from "../context/StateContext";
import { Alert } from "@mui/material";

const DeleteGameButton = ({ game, gameStats, setGameStats, filteredGames }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => setOpen(false);
  const handleClickOpen = () => setOpen(true);

  const { group_id } = useParams();
  const { setGames, games, matches } = useContext(Context);

  const handleDeleteGame = (gameId) => {
    axios
      .delete(`http://localhost:4000/game/${group_id}/${gameId}/nomatches`)
      .then((res) => {
        if (res.status === 200) {
          const updatedGames = games.filter((game) => game.id !== gameId);
          setGames(updatedGames);
          handleClose();
          setError("Success");
          console.log(gameId, "isdfis");
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setError(
            "Cannot delete game with associated matches.\nPlease delete the matches first associated with the game and try again."
          );
        } else {
          console.log(err);
        }
      });
  };


  return (
    <>
      <IconButton sx={{ ml: 35 }} onClick={handleClickOpen}>
        <ClearIcon />
      </IconButton>
      {/* Dialog component  */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {error && (
          <Alert
            severity={error === "Success" ? "success" : "error"}
            style={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1000,
              whiteSpace: "pre-line",
              textAlign: "center",
            }}
          >
            {error}
          </Alert>
        )}
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this game ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            To confirm, click on the delete button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
       {/* Render the appropriate button */}
       {!filteredGames ? (
        // Game associated with matches
            <Button
              onClick={() => handleDeleteGame(game.game_id)}
              color="error"
              variant="contained"
              type="submit"
            >
              Delete
            </Button>
          ) : (
            // Game not associated with matches
            <Button
              onClick={() => handleDeleteGame(game.id)}
              color="error"
              variant="contained"
              type="submit"
            >
              Delete w/o match
            </Button>
          )}
           {console.log(filteredGames, "filteredGames")}
          
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteGameButton;
