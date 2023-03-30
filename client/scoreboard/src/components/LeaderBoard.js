import React, { useContext, useEffect, useState, } from "react";
import { Paper, Avatar, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/StateContext";
import trophy1 from '../assets/trophy11.png';
import trophy2 from '../assets/trophy22.png';
import trophy3 from '../assets/trophy33.png';
import trophy4 from '../assets/trophy44.png';
import './Leaderboard.css'

const LeaderBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");
  const { group_id } = useParams();
  const [leaderboard, setLeaderboard] = useState([])
  const { players, setPlayers, matches } = useContext(Context);



  useEffect(() => {
    axios.get(`http://localhost:4000/group/leaderboard/${group_id}`, { withCredentials: true })
      .then(res => {
        const leaderboard = res.data.leaderboard.map(player => {
          return {
            ...player,
            backgroundColor: getRandomColor()
          }
        });
        setLeaderboard(leaderboard);
      });

  }, [group_id, setPlayers, setLeaderboard]);


  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }



  return (
    <>
      {/* Leaderboard Container/Box */}
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
            height: "fit-content",
            maxHeight: 800,
            backgroundColor: "rgba( 0, 0, 0, 0.6 )",
            // backgroundImage: "url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            backdropFilter: "blur( 8.5px )",
            borderRadius: "10px",
          },
        }}
      >
        <Paper elevation={0}>
          <Link to="/players" style={{ textDecoration: "none", color: 'black' }}>
            <h1 style={{ color: "white" }}>Leaderboard</h1>
          </Link>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              textAlign: "left",
              "& > :not(style)":
              {
                padding: 1,
                width: 374,
                height: isMobile ? 100 : 'fit-content',
              },
            }}
          >


{/* This conditions renders the page a lot of times when its called */}
            {matches.length === 0 && Array.isArray(players) && players.slice(0, 4).map((player, index) => {

              return (
                <div className="leader-box-empty" key={player.id}>
                  <h1>{index + 1}</h1>
                  {/* Avatar icon */}
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      background: player.backgroundColor,
                      padding: 1,
                    }}
                  >
                    {player.name[0]}{player.lastname[0]}
                  </Avatar>
                  {/* Profile Info */}
                  <div className="leader-info">
                    <h2 style={{ fontWeight: 'bold' }}>{player.name}</h2>
                  </div>
                </div>
              );
            })
            }



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

                <div className="leader-box"
                  key={player.id}>
                  <h1>{index + 1}</h1>
                  {/* Avatar icon */}
                  <Avatar
                    src={trophyImage}
                    sx={{
                      width: 56,
                      height: 56,
                      background: player.backgroundColor,
                      padding: 1,
                    }}
                  />
                  {/* Profile Info */}
                  <div className="leader-info">
                    <h2 style={{ fontWeight: 'bold' }}>{player.name}</h2>
                    <p><strong>Wins:</strong>{player.total_wins}</p>
                    <p> <strong>Total matches : </strong>{player.total_matches}</p>
                    <p><strong>Win Rate: %</strong> {Number(player.win_ratio).toFixed(1)}</p>
                  </div>
                </div>

              )
            })}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LeaderBoard;
