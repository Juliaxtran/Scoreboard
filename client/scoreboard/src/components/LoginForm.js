import React, { useState, useContext } from 'react'
import {
  useMediaQuery,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";




export default function LoginForm({ setError, setIsSignUp }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
;
  // const {setUser} = useContext(StateContext);

  const handleClick = () => {
    setIsSignUp(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4000/player/login", formData).then((res) => {
      console.log(res.data.player);
      const success = res.status === 200;
      if (success) {
        setError("Login Successful");
        setTimeout(() => setError(null), 3000);
      } else {
        setError("Login Failed")
      }
    }).catch(error => {
      console.log(error);
      setError("Email or Password is incorrect, try again");
      setTimeout(() => setError(null), 3000);
    });
  };


  const isMobile = useMediaQuery("(max-width:420px)");
  return (
    <form  onSubmit={handleSubmit}>
      <Box
        sx={{
          "& > :not(style)": {
            width: isMobile ? 336 : 400,
            height: 350,
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
            <TextField required
              label="Email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              autoComplete='username' />
            <TextField
              id="outlined-password-input"
              label="Password*"
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />

            <Button variant="contained" color="error" type="submit">
              Login
            </Button>
            <Button onClick={handleClick}>Don't have an account Register</Button>
          </div>
        </Paper>
      </Box>
    </form>
  )
}
