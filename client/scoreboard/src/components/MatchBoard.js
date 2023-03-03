import React from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";
import {Link} from "react-router-dom";


const MatchBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  return (
    <>
      {/*Grey Container */}
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
            },
          }}
          elevation={0}
        >
          <div>
            <div>
            <Link to="/matches" style={{ textDecoration: "none", color:'black' }}>
              <h1 style={{ marginRight: 750 }}>Previous Matches</h1>
              </Link>
            </div>
            <div className="box-container">
              {/* Match Form container - White Container  */}
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
                {/* Match Info */}
                <h1>Catan</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
              </Paper>
              {/* Match Form container - White Container  */}
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
                {/* Match Info */}
                <h1>Jenga</h1>
                <h3>Winner: Patrice</h3>
                <h3>Players: Julia, Tyler, Pat, Rebecca</h3>
                <h3>Date Played: Feb. 3, 2023</h3>
              </Paper>
              {/* Match Form container - White Container  */}
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
                {/* Match Info */}
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
