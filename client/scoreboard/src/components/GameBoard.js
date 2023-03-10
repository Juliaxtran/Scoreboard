import React from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";

const GameBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  return (
    // Gameboard Container/Box
    <Box
      sx={{
        textAlign: "center",
        "& > :not(style)": {
          m: 1,
          width: isMobile ? 335 : 905,
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
          <Link to="/games" style={{ textDecoration: "none", color:'black' }}>
            <h1 style={{ marginRight: 750 }}>Games</h1>
            </Link>
          </div>
          <div className="box-container">
            {/* Game container */}
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                mr: 2,
                height: 250,
                width: isMobile ? 310 : 350,
                mb: 6,
                mt: 2,
              }}
            >
              {/* Game Info  */}
              <h1>Catan</h1>
              <h3>Most Wins: Patrice</h3>
              <h3>Description:</h3>{" "}
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <h3>Most Losses: Ryan</h3>
            </Paper>
            {/* Game container */}
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: 250,
                width: isMobile ? 310 : 350,
                mr: 2,
                mb: 6,
                mt: 2,
              }}
            >
              {/* Game Info  */}
              <h1>Jenga</h1>
              <h3>Most Wins: Patrice</h3>
              <h3>Description:</h3>{" "}
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <h3>Most Losses: Ryan</h3>
            </Paper>
            {/* Game container */}
            <Paper
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                height: 250,
                width: isMobile ? 310 : 350,
                mr: 2,
                mb: 6,
                mt: 2,
              }}
            >
              {/* Game Info  */}
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
