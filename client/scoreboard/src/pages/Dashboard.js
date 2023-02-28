import React from "react";
import GameBoard from "../components/GameBoard";
import LeaderBoard from "../components/LeaderBoard";
import MatchBoard from "../components/MatchBoard";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div>Dashboard</div> 
      <div className="leaderboard-game-match">
      <LeaderBoard/>
      <div className="game-match">
    <MatchBoard/>
      <GameBoard/>
      </div>
      </div> 
    </>
  );
};

export default Dashboard;
