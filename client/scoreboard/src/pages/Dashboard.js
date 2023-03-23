import React from "react";

import AddButton from "../components/AddButton";
import GameBoard from "../components/GameBoard";
import LeaderBoard from "../components/LeaderBoard";
import MatchBoard from "../components/MatchBoard";
import NavBar from "../components/NavBar";
import "./Dashboard.css";


const Dashboard = () => {



  return (
    <>
      <NavBar />
      <AddButton className='addButtons'/>
      <div className="leaderboard-game-match" style={{ marginLeft: 20}}>
        <LeaderBoard />
        <div className="game-match">
          <div className="leaderboard-button">

          </div>
          <MatchBoard />
          <GameBoard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
