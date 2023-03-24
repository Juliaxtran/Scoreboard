import React, { useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import GameBoard from "../components/GameBoard";
import LeaderBoard from "../components/LeaderBoard";
import MatchBoard from "../components/MatchBoard";
import NavBar from "../components/NavBar";
import "./Dashboard.css";
import {Context} from "../context/StateContext";
import axios from "axios";


const Dashboard = () => {

  const { setGames, setPlayers, setMatches} = useContext(Context);
  const { group_id } = useParams();

  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:4000/game/all/${group_id}`),
      axios.get(`http://localhost:4000/group/players/${group_id}`),
      axios.get(`http://localhost:4000/match/${group_id}`)
    ]).then(axios.spread((gamesResponse, playersResponse, matchResponse) => {
      const newGames = gamesResponse.data.games;
      const newPlayers = playersResponse.data.players;
      const newMatches = matchResponse.data.matches;
      setGames(newGames);
      setPlayers(newPlayers);
      setMatches(newMatches);
    })).catch((error) => {
      console.log(error);
    });
  });

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
