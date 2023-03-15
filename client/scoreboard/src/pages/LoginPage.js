import React, {useState} from "react";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";
import  {Alert}  from "@mui/material";

const LoginPage = () => {
  const [error, setError] = useState(null)


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
      <LoginForm setError={setError}/>
      </div>
      </div>
  );
};

export default LoginPage;
