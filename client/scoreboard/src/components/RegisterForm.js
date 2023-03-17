import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/StateContext";

import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";

const RegisterForm = ({ setError, setIsSignUp }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
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
      .post("http://localhost:4000/player/signup", formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        const player = res.data.player;
        sessionStorage.setItem("user", JSON.stringify(player));
        const success = res.status === 200;
        if (success) {
          setError("Registration Successful");
          setTimeout(() => setError(null), 3000);
          navigate("/group");
        } else {
          setError("Registration Failed");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Email already exists, please login");
        setTimeout(() => setError(null), 3000);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          "& > :not(style)": {
            width: isMobile ? 300 : 400,
            height: 460,
            marginLeft: isMobile ? 0 : 60,
            px: 3,
            py: 4,
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
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
              marginTop: 2,
            }}
          >
            Register
          </Typography>
          <div className="authentication-form">
            <TextField
              required
              label="First Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              required
              label="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            <TextField
              required
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              id="outlined-password-input"
              label="Password*"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
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
