import React, {useState} from "react";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import "./LoginPage.css";
import  {Alert}  from "@mui/material";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const [isSignUp,  setIsSignUp] = useState(true);


  return (
    <div className="LoginPage">
      <NavBar />
      {error && (
    <Alert severity={error === "Login Successful" ? "success" : "error"}>
      {error}
    </Alert>
  )}
      <div className='login'>
      <div className='loginCopy'>
      Scorebook  allows you to keep track of scores and statistics for your favorite games. Whether you're playing with friends, family, or in a league, ScoreBoard makes it easy to record and track scores, as well as individual and team statistics. Scorebook an app for the competitive friends.
      </div>
      {isSignUp ? <LoginForm setIsSignUp={setIsSignUp} setError={setError}/> : <RegisterForm setIsSignUp={setIsSignUp} setError={setError}/> }

      </div>
      </div>
  );
};

export default LoginPage;
