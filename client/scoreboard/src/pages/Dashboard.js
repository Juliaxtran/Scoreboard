import React, { useEffect } from "react";
import AddButton from "../components/AddButton";
import GameBoard from "../components/GameBoard";
import LeaderBoard from "../components/LeaderBoard";
import MatchBoard from "../components/MatchBoard";
import NavBar from "../components/NavBar";
import { Context } from '../context/StateContext';

const Dashboard = ({setGroupId,groupId}) => {

  useEffect(() => {
    const storedGroupId = localStorage.getItem('groupId');
    if (storedGroupId) {
      setGroupId(storedGroupId);
    }
  }, []);

  return (
    <>
      <NavBar />
      <p>GroupId:{groupId}</p>
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
