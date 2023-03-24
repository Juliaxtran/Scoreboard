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
  const { setPlayers } = useContext(Context);

  useEffect(() => {
    axios.get(`http://localhost:4000/group/leaderboard/${group_id}`, { withCredentials: true })
      .then(res => {
        setLeaderboard(res.data.leaderboard);
      })
  }, [ group_id, setPlayers]);


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
            height: isMobile ? 820 : 1000,
          },
        }}
      >
        <Paper sx={{ backgroundColor: "#cdcdcdf5" }} elevation={0}>
          <Link to="/players" style={{ textDecoration: "none", color: 'black' }}>
            <h1>Leaderboard</h1>
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

            {/* Profile Container */}
            {Array.isArray(leaderboard) && leaderboard.slice(0,6).map((player, index) => {
                let trophyImage;
                if (index === 0) {
                  trophyImage = trophy1;
                } else if (index === 1) {
                  trophyImage = trophy2 ;
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
