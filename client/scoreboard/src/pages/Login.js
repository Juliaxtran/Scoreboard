import React, {useState} from "react";
import NavBar from "../components/NavBar";
import {
  useMediaQuery,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:420px)");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:", { email, password });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <NavBar />
      <div className="authentication">
        <form onSubmit={handleSubmit}>
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
              <TextField required label="Email"
               id='email'
               name="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}/>
              <TextField
                id="outlined-password-input"
                label="Password*"
                name='password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />

              <Button variant="contained" color="error" type="submit">
                Login
              </Button>
            </div>
          </Paper>
        </Box>
        </form>
      </div>
    </>
  );
};

export default Login;
