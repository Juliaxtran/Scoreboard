import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import {  useContext, useEffect , useState} from "react";
import { Context } from "../context/StateContext";
import NavBar from "../components/NavBar";
import { Button, Box} from "@mui/material";
import CustomTable from "../components/CustomTable";

const GameBoard = () => {

  const { group_id } = useParams();
  const [gameStats, setGameStats] = useState([]);


  const {setGames: setContextGames} = useContext(Context);


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
      const winners = Object.entries(gameResults.players)
        .filter(([player, playerResults]) => playerResults.wins === gameResults.highestWins)
        .map(([player]) => player)
        .join(", ");
      const losers = Object.entries(gameResults.players)
        .filter(([player, playerResults]) => playerResults.losses === gameResults.highestLosses)
        .map(([player]) => player)
        .join(", ");
      return { game, description: gameResults.description, winners, losers };
    });
  }


  useEffect(() => {
    axios
      .get(`http://localhost:4000/game/stats/${group_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        let data = getWinnersAndLosers(res.data.games);
        setGameStats(data);
      });
  }, [group_id, setContextGames]);



  return (
    <Box
    className="gameStatsPage"
    sx={{
      background: 'linear-gradient(to top, #8e9eab, #eef2f3)',
      paddingBottom: '2em',
      height: '100%',
      minHeight: '100vh',
    }}>

    <NavBar />
    <h1 style={{textAlign: 'center', fontFamily: 'Electrolize', margin: '1em'}}>Game Statistics</h1>
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2em',

      }} >
     <CustomTable data={gameStats} headings={['Game', 'Description', 'Most Wins', 'Most Loses']}/>
     <Link to={`/dashboard/${group_id}`} sx={{ textDecoration: 'none' }}>
  <Button
    variant="contained"
    sx={{
      marginBotton: '1em',
      bgcolor: "#edbe02",
      ml: 1,
      mb: 2,
      mt: 2,
      color: "warning",
      textDecoration: 'none',
      '&:hover': {
        bgcolor:
        "#f28720",
      }
    }}
  >
    Return to Dashboard
  </Button>
</Link>
      </Box>
    </Box>


  )
};

export default GameBoard;
