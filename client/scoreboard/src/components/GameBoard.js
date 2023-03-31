import React from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import {  useContext, useEffect , useState} from "react";
import { Context } from "../context/StateContext";

const GameBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");
  const { group_id } = useParams();
  const [gameStats, setGameStats] = useState([]);

  const { setGames: setContextGames, matches} = useContext(Context);

  // function getWinnersAndLosers(games) {
  //   const results = {};
  //   games.forEach((game) => {
  //     const { game: gameName, player, wins, losses } = game;
  //     if (!results[gameName]) {
  //       results[gameName] = {
  //         players: {},
  //         highestWins: 0,
  //         highestLosses: 0,
  //       };
  //     }
  //     const gameResults = results[gameName];
  //     if (!gameResults.players[player]) {
  //       gameResults.players[player] = {
  //         wins: 0,
  //         losses: 0,
  //       };
  //     }
  //     const playerResults = gameResults.players[player];
  //     playerResults.wins += parseInt(wins);
  //     playerResults.losses += parseInt(losses);
  //     if (playerResults.wins > gameResults.highestWins) {
  //       gameResults.highestWins = playerResults.wins;
  //     }
  //     if (playerResults.losses > gameResults.highestLosses) {
  //       gameResults.highestLosses = playerResults.losses;
  //     }
  //   });
  //   return Object.entries(results).map(([game, gameResults]) => {
  //     const winners = [];
  //     const losers = [];
  //     Object.entries(gameResults.players).forEach(([player, playerResults]) => {
  //       if (playerResults.wins === gameResults.highestWins) {
  //         winners.push(player);
  //       }
  //       if (playerResults.losses === gameResults.highestLosses) {
  //         losers.push(player);
  //       }
  //     });
  //     return { game, winners, losers };
  //   });
  // }

  function getWinnersAndLosers(games) {
    const results = {};
    games.forEach((game) => {
      const { game: gameName, game_id, description, player, wins, losses } = game;
      if (!results[gameName]) {
        results[gameName] = {
          game_id,
          description,
          players: {},
          highestWins: 0,
          highestLosses: 0,
        };
      }
      const gameResults = results[gameName];
      if (!gameResults.players[player]) {
        gameResults.players[player] = {
          wins: 0,
          losses: 0,
        };
      }
      const playerResults = gameResults.players[player];
      playerResults.wins += parseInt(wins);
      playerResults.losses += parseInt(losses);
      if (playerResults.wins > gameResults.highestWins) {
        gameResults.highestWins = playerResults.wins;
      }
      if (playerResults.losses > gameResults.highestLosses) {
        gameResults.highestLosses = playerResults.losses;
      }
    });
    return Object.entries(results).map(([game, gameResults]) => {
      const winners = [];
      const losers = [];
      Object.entries(gameResults.players).forEach(([player, playerResults]) => {
        if (playerResults.wins === gameResults.highestWins) {
          winners.push(player);
        }
        if (playerResults.losses === gameResults.highestLosses) {
          losers.push(player);
        }
      });
      return { game, game_id: gameResults.game_id, description: gameResults.description, winners, losers };
    });
  }


  useEffect(() => {
    axios
      .get(`http://localhost:4000/game/stats/${group_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        let data = getWinnersAndLosers(res.data.games);
        console.log(data);
        setGameStats(data);
      });
  }, [group_id, setContextGames]);








  return (
    // Gameboard Container/Box
    <Box
      sx={{
        textAlign: "center",
        "& > :not(style)": {
          m: 1.5,
          width: 'fit-content',
          height: isMobile ? 1000 : 350,
          p:1,
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
            {matches.length > 0 && Array.isArray(gameStats) && gameStats.slice(0, 4).map((game) => {
                return (
                  <React.Fragment key={game.game_id}>
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
                      key={game.game_id}
                    >
                      {/* Game Info  */}
                      <h1>{game.game}</h1>

                      <h3>Description:</h3>
                      <p>{game.description}</p>
                      {/* TODO:Query or equation to calculate most wins and losses */}
                      <h3>Most Wins</h3>
                      <p>{game.winners.join(",")}</p>
                      <h3>Most Losses</h3>
                      <p>{game.losers.join(",")}</p>
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
