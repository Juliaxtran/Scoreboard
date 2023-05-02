import React, { useContext, useState } from 'react'
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Context } from '../context/StateContext';

const DeleteGameButton = ({game}) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleClickOpen = () => setOpen(true);
  
    const { group_id } = useParams();
    const { setGames, games, matches } = useContext(Context);

    
    const handleDeleteGame = (gameId) => {
        axios.delete(`http://localhost:4000/game/${group_id}/${gameId}/matches`)
          .then((res) => {
            if (res.status === 200) {
              const updatedGames = games.filter((game) => game.game_id !== gameId);
              setGames(updatedGames);
              handleClose();
              console.log(gameId)
            }
          })
          .catch((err) => console.log(err));
   
      };
    
const handleDeleteGameWithMatch = (gameId) => {
  axios.delete(`http://localhost:4000/game/${group_id}/${gameId}/nomatches`)
  .then((res) => {
    if (res.status === 200) {
      const updatedGames = games.filter((game) => game.game_id !== gameId);
      console.log(updatedGames, 'updated games')
      setGames(updatedGames);
      handleClose();
      console.log(gameId)
    }
  })
  .catch((err) => console.log(err));

};

      console.log(game, 'list game')
  return (
    <>

    <IconButton sx={{ ml: 35 }} onClick={handleClickOpen}><ClearIcon /></IconButton>
    {/* Dialog component  */}
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
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
       {/* if the game has matches or no match  */}
        {matches.length === 0 ? <Button onClick={() =>  handleDeleteGame(game.game_id)} color="error" variant="contained" type="submit">
          Delete w/o match 
        </Button>:  <Button onClick={() => handleDeleteGameWithMatch(game.game_id)} color="error" variant="contained" type="submit">
          Delete
        </Button>}
      </DialogActions>
    </Dialog>
  </>
  )
}

export default DeleteGameButton; 