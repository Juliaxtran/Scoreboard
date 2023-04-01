import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { useParams, Link } from "react-router-dom";
import { Button } from '@mui/material';
import axios from 'axios';
import CustomTable from '../components/CustomTable';

const AllPlayers = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);


  const { group_id } = useParams();

  function restructureGameData(data) {
    const result = {};
    for (const game of data.games) {
      const name = game.name;

      const gameName = game.game_name;
      const totalWins = parseInt(game.total_wins);
      const totalLosses = parseInt(game.total_losses);

      if (!(name in result)) {
        result[name] = {};
      }

      if (!(gameName in result[name])) {
        result[name][gameName] = {totalWins, totalLosses};
      } else {
        result[name][gameName].totalWins += totalWins;
        result[name][gameName].totalLosses += totalLosses;
      }
    }

    const finalResult = [];
    for (const [name, games] of Object.entries(result)) {
      for (const [gameName, stats] of Object.entries(games)) {
        const totalMatches = stats.totalWins + stats.totalLosses;
        const winRate = totalMatches === 0 ? 0 : stats.totalWins / totalMatches;
        const winRateRounded = '%' + Math.round(winRate * 100).toFixed(1)   ;
        finalResult.push({
          name,
          gameName,
          totalWins: stats.totalWins,
          totalLosses: stats.totalLosses,
          totalMatches,
          winRateRounded,
        });
      }
    }

    return finalResult;
  }

  const restructureLeaderboard = (data) => {
    return data.map((player) => {
      const formatedWinRate = '%' + parseFloat(player.win_ratio).toFixed(1);
      return {
        name: player.name,
        totalWins: player.total_wins,
        totalMatches: player.total_matches,
        winRatio: formatedWinRate,
      };
    });
  }



  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:4000/game/stats/table/${group_id}`, {
        withCredentials: true,
      }),
      axios.get(`http://localhost:4000/group/leaderboard/${group_id}`, {
        withCredentials: true,
      })
    ]).then(axios.spread((statsResponse, leaderboardResponse) => {
      const statsPerGame = restructureGameData(statsResponse.data);
     const leaderboardData = restructureLeaderboard(leaderboardResponse.data.leaderboard);
      setPlayerStats(statsPerGame);
      setLeaderboard(leaderboardData);
      console.log(leaderboard)
    })).catch((error) => {
      console.log(error);
    });
  }, [group_id]);



  return (
    <>
      <NavBar />
      <h1>Win rates</h1>
      <CustomTable data={leaderboard} headings={['Player', 'Total Matches', 'Total Wins', 'Win Rate']}/>
      <CustomTable data={playerStats} headings={['Player', 'Game', 'Total Matches', 'Total Wins', 'Total Losses', 'Win Rate']}/>
    <Link to={`/dashboard/${group_id}`}>
          <Button>Return to Dashboard</Button>
      </Link>
    </>
  )
}

export default AllPlayers;