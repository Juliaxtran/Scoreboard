import React from "react";
import NavBar from "../components/NavBar";
import {
  useMediaQuery,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:420px)");

  return (
    <>
      <NavBar />
      <div className="authentication">
        <Box
          sx={{
            "& > :not(style)": {
              width: isMobile ? 336 : 400,
              height:  350,
              position: "absolute",
              top: 200,
              marginLeft: isMobile ? 2 : 60,
              paddingLeft: 2,
              paddingRight: 2,
            },
          }}
        >
          <Paper elevation={3}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontFamily: "JetBrains Mono, monospace",
                textAlign: "center",
                fontWeight: "bold",
                marginTop: 5,
              }}
            >
              Login
            </Typography>
            <div className="authentication-form">
              <TextField required label="Email" />
              <TextField
                id="outlined-password-input"
                label="Password*"
                type="password"
                autoComplete="current-password"
              />

              <Button variant="contained" color="error" type="submit">
                Login
              </Button>
            </div>
          </Paper>
        </Box>
      </div>
    </>
  );
};

export default Login;
