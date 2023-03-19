import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const Context = createContext();


const StateContext = ({ children }) => {

  const [user, setUser] = useState({});
  const [players, setPlayers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [games, setGames] = useState([]);
  const [matches, setMatches] = useState([]);
  const [playerVal, setPlayerVal] = useState([]);
  const [winnerVal, setWinnerVal] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/profile', { withCredentials: true })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddPlayer = () => {
    const abc = [...playerVal, []]
    setPlayerVal(abc)
  };

  const handleDeletePlayer = (index) => {
    const newPlayersCopy = [...playerVal];
    newPlayersCopy.splice(index, 1);
    setPlayerVal(newPlayersCopy);
  };

  const handleAddWinner = () => {
    const abc = [...winnerVal, []]
    setWinnerVal(abc)
  };

const handleDeleteWinner = (index) => {
    const newWinnersCopy = [...winnerVal];
    newWinnersCopy.splice(index, 1);
    setWinnerVal(newWinnersCopy);
  };

  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    setPlayers([...players, { name: e.target[0].value }]);
    e.target[0].value = '';
  };

  const handleGameSubmit = (e) => {
    e.preventDefault();
    setGames([...games, { name: e.target[0].value }]);
    e.target[0].value = '';
  };



  const handleMatchSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    // Create an array to store player values
    let players = [];
    for (let i = 1; i <= playerVal.length + 2; i++) {
      const player = form.elements[`player${i}`] ? form.elements[`player${i}`].value : "";
      players.push(player);
    }

    let winners = [];
    for (let i = 1; i <= winnerVal.length + 1; i++) {
      const winner = form.elements[`winner${i}`] ? form.elements[`winner${i}`].value : "";
      winners.push(winner);
    }

    const game = form.elements["game"] ? form.elements["game"].value : "";


    // Create a new object with player values
    let match = {};
    players.forEach((player, index) => {
      match[`player${index + 1}`] = player;
    });

    // Create a new object with winner values
    winners.forEach((winner, index) => {
      match[`winner${index + 1}`] = winner;
    });

    // Game value
    match.game = game;
    setMatches([...matches, match]);
    console.log(matches);
  };

  const orderPlayersByWins = () => {
    let totalGames = matches.length;
    console.log("Total Games", totalGames);
    let wins = {};
    matches.forEach((match) => {
      for (let i = 1; i <= winnerVal.length + 1; i++) {
        const winner = match[`winner${i}`];
        if (winner) {
          if (wins[winner]) {
            wins[winner] += 1;
          } else {
            wins[winner] = 1;
          }
        }
      }
    });
    console.log("Wins", wins);
    let winPercentage = {};
    for (let player in wins) {
      winPercentage[player] = (wins[player] / totalGames) * 100;
    }
    console.log("Win Percentage", winPercentage);
    let orderedPlayers = Object.keys(wins).sort((a, b) => wins[b] - wins[a]);
    console.log("Ordered Players", orderedPlayers);
  };

  return (
    <Context.Provider value={{
      players,
      games,
      matches,
      playerVal,
      orderPlayersByWins,
      setPlayerVal,
      setPlayers,
      setGames,
      setMatches,
      handlePlayerSubmit,
      handleAddPlayer,
      handleGameSubmit,
      handleMatchSubmit,
      handleAddWinner,
      winnerVal,
      user,
      setUser,
      groups,
      setGroups,
      handleDeletePlayer, 
      handleDeleteWinner

    }}>
      {children}
    </Context.Provider>
  );
};

export { StateContext, Context};