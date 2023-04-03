import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import { useParams, Link } from "react-router-dom";
import { Button, Box } from '@mui/material';
import axios from 'axios';
import CustomTable from '../components/CustomTable';


const AllPlayers = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [setPlayers] = useState([]);


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
        result[name][gameName] = { totalWins, totalLosses };
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
        const winRateRounded = '%' + Math.round(winRate * 100).toFixed(1);
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

  const resturturePlayers = (data) => {
    return data.map((player) => {
      return {
        name: player.name,
        lastName: player.lastname,
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
      }),
      axios.get(`http://localhost:4000/group/players/${group_id}`, {
        withCredentials: true,
      })
    ]).then(axios.spread((statsResponse, leaderboardResponse, playersResponse) => {
      const statsPerGame = restructureGameData(statsResponse.data);
      const leaderboardData = restructureLeaderboard(leaderboardResponse.data.leaderboard);
      const playerData = resturturePlayers(playersResponse.data.players);
      setPlayerStats(statsPerGame);
      setLeaderboard(leaderboardData);
      setPlayers(playerData);

    })).catch((error) => {
      console.log(error);
    });
  }, [group_id]);

  // {fontFamily: 'Fugaz One, cursive'}

  return (
    <Box className='playerStatsPage'
    sx={{
      background: 'linear-gradient(to top, #8e9eab, #eef2f3)',
      paddingBottom: '2em',
      height: '100%',
      minHeight: '100vh',
    }}>
      <NavBar />
      <h1 style={{ textAlign: 'center', fontFamily: 'Electrolize', margin: '1em' }}>Player Statistics</h1>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2em',
      }} >

        <h3 style={{ textAlign: 'start', fontFamily: 'Electrolize' }}>Total Win Rate</h3>
        <CustomTable data={leaderboard} headings={['Player', 'Total Matches', 'Total Wins', 'Win Rate']} />
        <h3 style={{ textAlign: 'start', fontFamily: 'Electrolize' }}>Win Rate Per Game</h3>
        <CustomTable data={playerStats} headings={['Player', 'Game', 'Total Matches', 'Total Wins', 'Total Losses', 'Win Rate']} />
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
}

export default AllPlayers;