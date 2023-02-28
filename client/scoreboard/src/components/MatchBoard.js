import React from "react";
import { Paper, Box } from "@mui/material";

const MatchBoard = () => {
  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          "& > :not(style)": {
            m: 1,
            width: 900,
            height: 350,
          },
        }}
      >
        <Paper
          sx={{
            backgroundColor: "#cdcdcdf5",
            "& > :not(style)": {
              m: 1,
              width: 850
            },
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
          elevation={2}
        >
          <div>
            <div>
              <h1 style={{marginRight: 750}}>Previous Matches</h1>
            </div>
            <div style={{display:'flex'}}>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: 250,
                  width: 350,
                   mr: 2
                }}
              >
                <h1>Catan</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: 250,
                  width: 350,
                  mr: 2
                }}
              >
                <h1>Jenga</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  height: 250,
                  width: 350,
                  mr: 2
                }}
              >
                <h1>Chess</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
              </Paper>
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
};

export default MatchBoard;
