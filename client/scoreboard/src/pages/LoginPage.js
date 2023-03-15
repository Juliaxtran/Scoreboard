import React from "react";
import NavBar from "../components/NavBar";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";


const LoginPage = () => {


  return (
    <div className="LoginPage">
      <NavBar />
      <div className='login'>
      <div className='loginCopy'>
      Scorebook app that allows you to keep track of scores and statistics for your favorite games. Whether you're playing with friends, family, or in a league, ScoreBoard makes it easy to record and track scores, as well as individual and team statistics. Scorebook for the competitive friends.
      </div>
      <LoginForm />
      </div>
      </div>
  );
};

export default LoginPage;
