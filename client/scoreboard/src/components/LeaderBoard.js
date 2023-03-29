import React, { useContext, useEffect, useState } from "react";
import { Paper, Avatar, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/StateContext";
import trophy1 from '../assets/trophy1.png';
import trophy2 from '../assets/trophy2.png';
import trophy3 from '../assets/trophy3.png';
import trophy4 from '../assets/trophy4.png';

const LeaderBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  const { group_id } = useParams();
  const [leaderboard, setLeaderboard] = useState([])
  const { players, setPlayers, matches } = useContext(Context);


  useEffect(() => {
    axios.get(`http://localhost:4000/group/leaderboard/${group_id}`, { withCredentials: true })
      .then(res => {
        setLeaderboard(res.data.leaderboard);
      })
  }, [group_id, setPlayers]);

  // String Avatar
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


  return (
    <>
      {/* Leaderboard Container/Box */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          "& > :not(style)": {
            m: 1,
            p: 3,
            mt: isMobile ? 35 : 0,
            width: isMobile ? 335 : 400,
            height: "100vh",
            background: "rgba( 9, 9, 9, 0.4 )",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            backdropFilter: "blur( 8.5px )",
            "-webkit-backdrop-filter": "blur( 8.5px )",
            borderRadius: "10px",
            border: "1px solid rgba( 255, 255, 255, 0.18 )",
          },
        }}
      >
        <Paper elevation={0}>
          <Link to="/players" style={{ textDecoration: "none", color: 'black' }}>
            <h1 style={{color: "white"}}>Leaderboard</h1>
          </Link>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              textAlign: "left",
              "& > :not(style)": {
                m: 1,
                width: 390,
                height: isMobile ? 200 : 150,
              },
            }}
          >


            {matches.length === 0 && Array.isArray(players) && players.slice(0, 4).map((player) => (
              <h1 key={player.id}>{player.name}</h1>
            ))}


            {matches.length > 0 && Array.isArray(leaderboard) && leaderboard.slice(0, 6).map((player, index) => {
              let trophyImage;
              if (index === 0) {
                trophyImage = trophy1;
              } else if (index === 1) {
                trophyImage = trophy2;
              } else if (index === 2) {
                trophyImage = trophy3;
              } else {
                trophyImage = trophy4;
              }


              return (
                <Paper key={player.id}>
                  <div className="leader-box">
                    <h1>{index + 1}</h1>
                    {/* Avatar icon */}
                    <Avatar
                      src={trophyImage}
                      sx={{
                        width: 75,
                        height: 75,
                        backgroundColor: "#cdcdcdf5",
                        padding: 1,
                      }}
                    />
                    {/* Profile Info */}
                    <div className="leader-info">
                      <h1>{player.name}</h1>
                      <h3>Wins: {player.total_wins}</h3>
                      <h3>Total matches : {player.total_matches}</h3>
                      <h3>Win Rate: % {Number(player.win_ratio).toFixed(1)}</h3>
                    </div>
                  </div>
                </Paper>
              )
            })}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LeaderBoard;
