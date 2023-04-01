import React from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/StateContext";

const GameBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");
  const { group_id } = useParams();
  const [gameStats, setGameStats] = useState([]);
  const [games, setGames] = useState([]);

  const { setGames: setContextGames, matches } = useContext(Context);

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




  useEffect (() => {
    axios.all([
      axios.get(`http://localhost:4000/game/all/${group_id}`),
      axios.get(`http://localhost:4000/game/stats/${group_id}`)
    ]).then(axios.spread((gamesResponse, statsResponse) => {
      const newGames = gamesResponse.data.games;
      const newStats = getWinnersAndLosers(statsResponse.data.games);
      setGames(newGames);
      setGameStats(newStats);
    })).catch((error) => {
      console.log(error);
    });
  },[]);





  return (
    <>
      {/* Game Board Container/Box */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          justifyContent: "center",
          "& > :not(style)": {
            m: 1,
            p: 3,
            mt: isMobile ? 35 : 0,
            width: isMobile ? 335 : 400,
            height: 'fit-content',
            maxHeight: "600px",
            overflowY: "scroll",
            backgroundColor: "rgba( 0, 0, 0, 0.6 )",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            backdropFilter: "blur( 8.5px )",
            borderRadius: "10px",
            "&::-webkit-scrollbar": {
              width: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "rgba(255, 255, 255, 0.1)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "black",
              borderRadius: "20px",
              border: "3px solid rgba(0, 0, 0, 0)",
            },
          },
        }}
      >
        <Paper elevation={0}>

          <Link className='dashboard-heading' to={`/games/${group_id}`} style={{ textDecoration: "none", color: 'black' }}>
            <h1 className='dashboard-heading' style={{ color: "white", marginBottom: "1em" }}>
              Games
            </h1>
          </Link>

          {matches.length === 0 && games.length === 0 && <h3 style={{ color: "white" }}>Add some Games to begin</h3>}
          {matches.length === 0 && games.length > 0 && Array.isArray(games) && games.map((game) => {
            return (
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: '100px',
                  width: isMobile ? 310 : 350,
                  margin: '0 auto',
                  mb: '1em',
                  p: 2,
                }}
                key={game.game_id}
              >
                <h1>{game.name}</h1>
                <h3>Description:</h3>
                <p>{game.description}</p>
              </Paper>
            );
          })
          }


          {Array.isArray(gameStats) && gameStats.map((game) => {
            return (
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: '150px',
                  width: isMobile ? 310 : 350,
                  margin: '0 auto',
                  mb: '1em',
                  p: 1,
                }}
                key={game.game_id}
              >
                <h1>{game.game}</h1>

                <h3>Description:</h3>
                <p>{game.description}</p>
                <h3>Most Wins</h3>
                <p>{game.winners.join(",")}</p>
                <h3>Most Losses</h3>
                <p>{game.losers.join(",")}</p>

              </Paper>
            );
          })}
          {
            matches.length > 0 && <Link to={`/games/${group_id}`} className='links'>
              <h3>See more stats</h3>
            </Link>
          }

        </Paper>
      </Box>
    </>

  );
};

export default GameBoard;
