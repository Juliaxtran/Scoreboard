import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  useMediaQuery,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import { Context } from '../context/StateContext';


export default function LoginForm({ setError, setIsSignUp}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
;
const [loading, setLoading] = useState(false);
const {setUser} = useContext(Context);
const navigate = useNavigate();

  const handleClick = () => {
    setIsSignUp(false);
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true
    axios.post("http://localhost:4000/player/login", formData, { withCredentials: true }).then((res) => {
      const player = res.data.player;
      setUser(player);
      setLoading(false); // Set loading state to false after updating user state
      const success = res.status === 200;
      if (success) {
        setError("Login Successful");
        setTimeout(() => setError(null), 3000);
        navigate('/group');
      } else {
        setError("Login Failed")
      }
    }).catch(error => {
      console.log(error);
      setError("Email or Password is incorrect, try again");
      setLoading(false); // Set loading state to false after login process is complete
      setTimeout(() => setError(null), 3000);
    });
  };


  const isMobile = useMediaQuery("(max-width:420px)");
  return (
    <form  onSubmit={handleSubmit}>
      <Box
        sx={{
          "& > :not(style)": {
            width: isMobile ? 300 : 400,
            height: isMobile ? 320 : 350,
            marginLeft: isMobile ? 0 : 60,
            px : 3,
            py: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
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
              marginTop: 3,
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

<Button variant="contained" color="error" type="submit" disabled={loading}>
  {loading ? 'Logging in...' : 'Login'}
</Button>
            <Button onClick={handleClick}>Don't have an account Register</Button>
          </div>
        </Paper>
      </Box>
    </form>
  )
}
