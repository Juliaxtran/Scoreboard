import React, { useContext, useEffect } from "react";
import { Paper, Avatar, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Context } from "../context/StateContext";

const LeaderBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  const { group_id } = useParams();
  const { setPlayers, players } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/group/players/${group_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPlayers(res.data.players);
        console.log("res", res.data.players);
      });
  }, [group_id]);

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
            mt: isMobile ? 35 : 0,
            width: isMobile ? 335 : 400,
            height: isMobile ? 820 : 1000,
          },
        }}
      >
        <Paper sx={{ backgroundColor: "#cdcdcdf5" }} elevation={0}>
          <Link
            to="/players"
            style={{ textDecoration: "none", color: "black" }}
          >
            <h1>Leaderboard</h1>
          </Link>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              textAlign: "center",
              "& > :not(style)": {
                m: 1,
                width: 390,
                height: isMobile ? 200 : 150,
              },
            }}
          >
            {/* Profile Container */}
            {Array.isArray(players) &&
              players.map((player) => {
                return (
                  <Paper key={player.id}>
                    <div className="leader-box">
                      {/* Avatar icon */}
                      <Avatar
                        src="/broken-image.jpg"
                        sx={{
                          width: 120,
                          height: 120,
                          color: "coral",
                          backgroundColor: "lightblue",
                        }}
                      />
                      {/* Profile Info */}
                      <div className="leader-info">
                        <h1>{player.name}</h1>
                        <h3>Wins: 10</h3>
                        <h3>Losses: 2 (optional)</h3>
                        <h3>Win Rate: 30%</h3>
                      </div>
                    </div>
                  </Paper>
                );
              })}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LeaderBoard;
