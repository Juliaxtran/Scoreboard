import React, { useContext, useEffect, useState, } from "react";
import { Paper, Avatar, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/StateContext";
import trophy1 from '../assets/trophy1.png';
import trophy2 from '../assets/trophy2.png';
import trophy3 from '../assets/trophy3.png';
import trophy4 from '../assets/trophy4.png';
import './Leaderboard.css'
import "../App.css";



const LeaderBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");
  const { group_id } = useParams();
  const [leaderboard, setLeaderboard] = useState([])
  const { players, setPlayers, matches } = useContext(Context);



  useEffect(() => {
    axios.get(`/group/leaderboard/${group_id}`, { withCredentials: true })
    .then(res => {
      const leaderboard = Array.isArray(res.data.leaderboard) ? res.data.leaderboard : [];
      const modifiedLeaderboard = leaderboard.map(player => {
        return {
          ...player,
          backgroundColor: getRandomColor()
        }
      });
      setLeaderboard(modifiedLeaderboard);
    })
    .catch(error => {
      console.log(error);
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
            maxHeight: 600,
            overflowY: "scroll",
            backgroundColor: "rgba( 40, 40, 40, 0.6 )",

            boxShadow: "rgba(255, 255, 255, 0.35) 0px 5px 15px",
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
        <Link to={`/players/${group_id}`} style={{ textDecoration: "none", color: 'black' }}>
          <h1 className='dashboard-heading' style={{ color: "white", marginBottom:'1em' }}>{matches.length === 0 ? 'Players' : 'Leaderboard'}</h1>
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
            {matches.length === 0 && Array.isArray(players) && players.slice(0, 8).map((player, index) => {

              return (
                <div className="leader-box-empty" key={player.id}>
                  <h1>{index + 1}</h1>
                  {/* Avatar icon */}
                  <Avatar
                    sx={{
                      width: 45,
                      height: 45,
                      background: getRandomColor(),
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
          {
            matches.length > 0 && <Link to={`/players/${group_id}`} className='links'>
              <h3>See more stats</h3>
            </Link>
          }

        </Paper>

      </Box>
    </>
  );
};

export default LeaderBoard;
