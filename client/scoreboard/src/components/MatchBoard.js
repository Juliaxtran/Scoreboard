
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Context } from "../context/StateContext";
import matchImg from "../assets/matches.png";
import "../App.css";


const MatchBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  const { group_id } = useParams();
  const { setMatches, matches } = useContext(Context);



  useEffect(() => {
    axios
      .get(`/matches/${group_id}`, { withCredentials: true })
      .then((res) => {
        setMatches(res.data.matches);
      });
  }, [group_id, setMatches]);



  return (
    <>
<Box
  sx={{
    display: "flex",
    flexWrap: "wrap",
    textAlign: "center",
    justifyContent: "center",
    "& > :not(style)": {
      m: 1,
      p: 3,
      mt: isMobile ? 0 : 0,
      width: isMobile ? 335 : 400,
      height: 'fit-content',
      maxHeight: "600px",
      overflowY: "scroll",
      overflowX: "hidden", // Add this line
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

          <Link className='dashboard-heading' to={`/matches/${group_id}`} style={{ textDecoration: "none", color: 'black' }}>
            <h1 className='dashboard-heading'style={{ color: "white", marginBottom: "1em"}}>
              Matches
            </h1>
          </Link>
           {/* This conditions renders the page a lot of times when its called */}
           {matches.length === 0 &&
           <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            gap: '1em',
           }}>
           <h3 style={{ color: 'white' }}>No Matches Played Yet</h3>
           <img src={matchImg} alt="matches" style={{ width: '300px', height: '300px', borderRadius:'5px' }} />
           </Box>
           }

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

export default MatchBoard;
