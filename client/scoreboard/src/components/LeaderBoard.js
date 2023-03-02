import React from "react";
import { Paper, Avatar, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";

const LeaderBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

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
          <h1>Leaderboard</h1>
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
            <Paper>
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
                  <h1>Julia tran</h1>
                  <h3>Wins: 10</h3>
                  <h3>Losses: 2 (optional)</h3>
                  <h3>Win Rate: 30%</h3>
                </div>
              </div>
            </Paper>
            {/* Profile Container */}
            <Paper>
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
                  <h1>Julia tran</h1>
                  <h3>Wins: 10</h3>
                  <h3>Losses: 2 (optional)</h3>
                  <h3>Win Rate: 30%</h3>
                </div>
              </div>
            </Paper>
            {/* Profile Container */}
            <Paper>
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
                  <h1>Julia tran</h1>
                  <h3>Wins: 10</h3>
                  <h3>Losses: 2 (optional)</h3>
                  <h3>Win Rate: 30%</h3>
                </div>
              </div>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LeaderBoard;
