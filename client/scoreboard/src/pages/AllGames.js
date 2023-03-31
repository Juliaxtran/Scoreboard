import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import {  useContext, useEffect , useState} from "react";
import { Context } from "../context/StateContext";
import NavBar from "../components/NavBar";
import { Button } from "@mui/material";

const GameBoard = () => {

  const { group_id } = useParams();
  const [gameStats, setGameStats] = useState([]);

  const { setGames: setContextGames, matches} = useContext(Context);

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
        setGameStats(data);
      });
  }, [group_id, setContextGames]);



  return (
    <>
    <NavBar />
 <table>
    <thead>
      <tr>
        <th>Game</th>
        <th>Description</th>
        <th>Most Wins</th>
        <th>Most Loses</th>
      </tr>
    </thead>
    <tbody>
      {gameStats.map((game) => (
        <tr key={game.game_id}>
          <td>{game.game}</td>
          <td>{game.description}</td>
          <td>{game.winners.join(', ')}</td>
          <td>{game.losers.join(', ')}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <Link to={`/dashboard/${group_id}`}>
          <Button>Return to Dashboard</Button>
      </Link>
    </>


  )
};

export default GameBoard;
