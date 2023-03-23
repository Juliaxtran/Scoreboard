import React, { useContext, useEffect } from "react";
import { Paper, Box, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import "../App.css";
import axios from "axios";
import { Context } from "../context/StateContext";
import { useParams } from "react-router-dom";

const MatchBoard = () => {
  const isMobile = useMediaQuery("(max-width:450px)");

  const { group_id } = useParams();
  const { setMatches, matches } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/match/${group_id}`, { withCredentials: true })
      .then((res) => {
        setMatches(res.data.matches);
      });
  }, [group_id, setMatches]);

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
            p: 2
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
              <Link
                to="/matches"
                style={{ textDecoration: "none", color: "black" }}
              >
                <h1 style={{ textAlign: 'left', mt: 2 }}>Previous Matches</h1>
              </Link>
            </div>
            <div className="box-container">

            {Array.isArray(matches) && matches.slice(0, 4).map((match) => {
                return (
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
                    key={match.id}
                  >
                    <div
                      className="action_buttons"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: -50,
                      }}
                    >
                      <IconButton>
                        <ClearIcon />
                      </IconButton>
                      <IconButton>
                        <ModeEditIcon />
                      </IconButton>
                    </div>
                    {/* Avatar icon */}
                    <h1>{match.game_name}</h1>
                    <h3>Winner(s): </h3>
                    <p>  {match.winners}</p>
                    <h3>Players:</h3>
                    <p> {match.player_names}</p>
                    <h3> Date Played:{" "}  </h3>
                    <p>  {new Date(match.played_on).toISOString().slice(0, 10)}</p>

                  </Paper>
                );
              })}
            </div>
          </div>
        </Paper>
      </Box>
    </>
  );
};

export default MatchBoard;
