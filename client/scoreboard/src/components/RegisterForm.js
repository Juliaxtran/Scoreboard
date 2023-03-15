import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";

const RegisterForm = ({ setError, setIsSignUp}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isMobile = useMediaQuery("(max-width:420px)");

  const handleClick = () => {
    setIsSignUp(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:4000/player/signup", formData)
      .then((res) => {
        console.log(res.data);
        const success = res.status === 200;
        if (success) {
          setError("Registration Successful, Please Login");
          setTimeout(() => setError(null), 3000);
        } else {
          setError("Registration Failed");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("registration failed, please try again");
        setTimeout(() => setError(null), 3000);
      });
  };

  return (
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            "& > :not(style)": {
              width: isMobile ? 336 : 400,
              height: isMobile ? 480 : 500,
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
              Register
            </Typography>
            <div className="authentication-form">
              <TextField
                required
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
              />

              <TextField
                required
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
              <TextField
                id="outlined-password-input"
                label="Password*"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <Button variant="contained" color="error" type="submit">
                Register
              </Button>
              <Button onClick={handleClick}>Login</Button>
            </div>
          </Paper>
        </Box>
      </form>
  );
};

export default RegisterForm;
