import React from "react";
import AddButton from "../components/AddButton";
import GameBoard from "../components/GameBoard";
import LeaderBoard from "../components/LeaderBoard";
import MatchBoard from "../components/MatchBoard";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="leaderboard-game-match" style={{marginTop:20, marginLeft: 20}}>
        <LeaderBoard />
        <div className="game-match">
          <div className="leaderboard-button">
          <AddButton />
          </div>
          <MatchBoard />
          <GameBoard />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
