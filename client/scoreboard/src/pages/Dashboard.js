import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import LeaderBoard from "../components/LeaderBoard";
import MatchBoard from "../components/MatchBoard";
import GameBoard from "../components/GameBoard";
import NavBar from "../components/NavBar";
import { Context } from "../context/StateContext";
import axios from "axios";
import { Alert, useMediaQuery } from "@mui/material";



const Dashboard = () => {

  const [error, setError] = React.useState(null);
  const { setGames, setPlayers, setMatches } = useContext(Context);
  const { group_id } = useParams();
  const isMobile = useMediaQuery("(max-width:450px)");



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
  }, []);

  setTimeout(() => {
    setError(null);
  }, 5000);


  return (
    <div className="dashboard" style={{
      height: '100%',
      minHeight: '100vh',
      width: "100%",
      minWidth: '100vw',
      background: `linear-gradient(to bottom, #3a6186, #89253e)`
    }} >
      <NavBar />
      {error && (
        <Alert
          severity={
            error === "Success"
              ? "success"
              : "error"
          }
          style={{ position: "fixed", top: "80px", left: "50%", transform: "translateX(-50%)", zIndex: 1000 }}
        >
          {error}
        </Alert>
      )}
      <AddButton className='addButtons' error={error} setError={setError} />
      <div className="leaderboard-game-match" style={{ marginLeft: 20 }}>
        <LeaderBoard />
        <GameBoard />
        <MatchBoard />
      </div>
    </div>
  );
};

export default Dashboard;
