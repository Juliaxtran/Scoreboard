import React, { useState } from "react";

import { Box, Paper, Typography, useMediaQuery, TextField, Autocomplete, Button } from "@mui/material";

const RegisterForm = () => {
  const isMobile = useMediaQuery("(max-width:420px)");

  const group = ["Team Fun", "Team 1", "Team Tornado"];


  return (
    <>
      <form >
        <Box
          sx={{
            "& > :not(style)": {
              width: isMobile ? 336 : 400,
              height: isMobile ? 480 : 500,
              position: "absolute",
              top: 200,
              marginLeft: isMobile ? 2 : 60,
              paddingLeft: 2,
              paddingRight: 2
            },
          }}
        >

          <Paper elevation={3}>
            <Typography variant="h5" component="div" sx={{ fontFamily: 'JetBrains Mono, monospace', textAlign: 'center', fontWeight: 'bold', marginTop: 5 }}>Register</Typography>
            <div className="authentication-form">
              <TextField
                required
                label="Name"
              />

              <TextField
                required

                label="Email"
              />
              <TextField
                id="outlined-password-input"
                label="Password*"
                type="password"
                autoComplete="current-password"
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={group}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select a Group" />
                )}
              />
              <Button variant="contained" color="error" type='submit'>
                Register
              </Button>
            </div>
          </Paper>
        </Box>
      </form>
    </>
  );
};

export default RegisterForm;
