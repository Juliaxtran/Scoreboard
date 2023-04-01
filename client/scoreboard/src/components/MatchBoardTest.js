import React, { useContext, useEffect } from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
// import ModeEditIcon from "@mui/icons-material/ModeEdit";
// import IconButton from "@mui/material/IconButton";
// import ClearIcon from "@mui/icons-material/Clear";
import "../App.css";
import axios from "axios";
import { Context } from "../context/StateContext";
import { useParams } from "react-router-dom";


const MatchBoardTest = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  const { group_id } = useParams();
  const { setMatches, matches } = useContext(Context);



  useEffect(() => {
    axios
      .get(`http://localhost:4000/matches/${group_id}`, { withCredentials: true })
      .then((res) => {
        setMatches(res.data.matches);
      });
  }, [group_id, setMatches]);




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

          <Link to={`/matches/${group_id}`} style={{ textDecoration: "none", color: 'black' }}>
            <h1 style={{ color: "white", marginBottom: "1.5em"}}>
              Matches
            </h1>
          </Link>


          {Array.isArray(matches) && matches.map((match) => {
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
                key={match.id}
              >
                <h1>{match.game_name}</h1>
                <h3>Winner(s): </h3>
                <h4 style={{ color: 'green' }}> <strong>{match.winners}</strong> </h4>
                <h3>Players:</h3>
                <h4 style={{ color: 'red' }} ><strong>{match.player_names}</strong> </h4>
                <h3> Date Played:{" "}  </h3>
                <p>  {new Date(match.played_on).toISOString().slice(0, 10)}</p>

              </Paper>
            );
          })}
      {
            matches.length > 0 && <Link to={`/matches/${group_id}`} className='links'>
              <h3>See more stats</h3>
            </Link>
          }

        </Paper>
      </Box>
    </>
  );
};

export default MatchBoardTest;
