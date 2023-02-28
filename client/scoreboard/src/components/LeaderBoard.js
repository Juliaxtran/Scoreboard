import React from "react";
import { Paper } from "@mui/material";
import { Box } from "@mui/system";

const LeaderBoard = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          textAlign: "center",
          "& > :not(style)": {
            m: 1,
            width: 400,
            height: 1000,
          },
        }}
      >
        <Paper sx={{ backgroundColor: "#cdcdcdf5" }} elevation={2}>
          <h1>Leaderboard</h1>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              textAlign: "center",
              "& > :not(style)": {
                m: 1,
                width: 390,
                height: 150,
              },
            }}
          >
            <Paper>
                <h1>Julia tran</h1>
                <h3>Wins: 10</h3>
                <h3>Losses: 2 (optional)</h3>
                <h3>Win Rate: 30%</h3>
            </Paper>
            <Paper>
                <h1>Julia tran</h1>
                <h3>Wins: 10</h3>
                <h3>Losses: 2 (optional)</h3>
                <h3>Win Rate: 30%</h3>
            </Paper>
            <Paper>
                <h1>Julia tran</h1>
                <h3>Wins: 10</h3>
                <h3>Losses: 2 (optional)</h3>
                <h3>Win Rate: 30%</h3>
            </Paper>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default LeaderBoard;
