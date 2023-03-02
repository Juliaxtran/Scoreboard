import React from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";

const GameBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  return (
    <Box
      sx={{
        textAlign: "center",
        "& > :not(style)": {
          m: 1,
          width: isMobile ?335 : 905,
          height: isMobile ? 1000 : 350,
        },
      }}
    >
      <Paper
        sx={{
          backgroundColor: "#cdcdcdf5",
          "& > :not(style)": {
            m: 1,
            width: 850,
          },
          display: "flex",
          justifyContent: "flex-start",
          textAlign: "center",
        }}
        elevation={0}
      >
        <div>
          <div>
            <h1 style={{ marginRight: 750 }}>Games</h1>
          </div>
          <div className="box-container">
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                mr: 2,
                height: 250,
                width: isMobile? 310:350,
                mb:6, 
                mt:2
              }}
            >
              <h1>Catan</h1>
              <h3>Most Wins: Patrice</h3>
              <h3>Description:</h3>{" "}
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <h3>Most Losses: Ryan</h3>
            </Paper>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: 250,
                width: 350,
                mr: 2,
                mb:6, 
                mt:2
              }}
            >
              <h1>Jenga</h1>
              <h3>Most Wins: Patrice</h3>
              <h3>Description:</h3>{" "}
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <h3>Most Losses: Ryan</h3>
            </Paper>
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: 250,
                width: 350,
                mr: 2,
                mb:6, 
                mt:2
              }}
            >
              <h1>Chess</h1>
              <h3>Most Wins: Patrice</h3>
              <h3>Description:</h3>{" "}
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <h3>Most Losses: Ryan</h3>
            </Paper>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default GameBoard;
