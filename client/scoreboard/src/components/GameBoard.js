import React from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/StateContext";
import { useParams } from "react-router-dom";
import {  useContext, useEffect } from "react";

const GameBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");
  const { group_id } = useParams();
  const { games, setGames } = useContext(Context);


  function generateNewArray(gameData) {
    let gamesObj = {};

    for (let i = 0; i < gameData.length; i++) {
      let game = gameData[i];
      let gameId = game.game_id;

      if (!gamesObj[gameId]) {
        gamesObj[gameId] = {
          id: gameId,
          name: game.name,
          description: game.description,
          player_most_wins: [game.player_most_wins],
          player_most_losses: [game.player_most_losses]
        };
      } else {
        if (!gamesObj[gameId].player_most_wins.includes(game.player_most_wins)) {
          gamesObj[gameId].player_most_wins.push(game.player_most_wins);
        }

        if (!gamesObj[gameId].player_most_losses.includes(game.player_most_losses)) {
          gamesObj[gameId].player_most_losses.push(game.player_most_losses);
        }
      }
    }

    let newGamesArray = [];

    for (let game in gamesObj) {
      newGamesArray.push(gamesObj[game]);
    }

    return newGamesArray;
  }



  useEffect(() => {
    axios
      .get(`http://localhost:4000/game/stats/${group_id}`, {
        withCredentials: true,
      })
      .then((res) => {
       let data = generateNewArray(res.data.games);
       console.log(data);
        setGames(data);


      });
  }, [group_id, setGames]);




  return (
    // Gameboard Container/Box
    <Box
      sx={{
        textAlign: "center",
        "& > :not(style)": {
          m: 1,
          width: isMobile ? 335 : 905,
          height: isMobile ? 1000 : 350,
          p:1
        },
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#cdcdcdf5",
          "& > :not(style)": {
            m: 1,
            width: 850,
          },
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
        elevation={0}
      >
        <div>
          <div>
            <Link
              to="/games"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h1 style={{ textAlign: 'left', mt: 2 }}>Games</h1>
            </Link>
          </div>
          <div className="box-container">
            {/* Game container */}
            {Array.isArray(games) && games.slice(0, 4).map((game) => {
                return (
                  <React.Fragment key={game.id}>
                    <Paper
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        height: 250,
                        width: isMobile ? 310 : 350,
                        mr: 2,
                        px: 1,

                      }}
                      key={game.id}
                    >
                      {/* Game Info  */}
                      <h1>{game.name}</h1>

                      <h3>Description:</h3>
                      <p>{game.description}</p>
                      {/* TODO:Query or equation to calculate most wins and losses */}
                      <h3>Most WINS</h3>
                      <p>{game.player_most_wins.join(",")}</p>
                      <h3>Most Losses</h3>
                      <p>{game.player_most_losses.join(",")}</p>
                    </Paper>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default GameBoard;
