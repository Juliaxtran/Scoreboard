import { createContext, useState } from 'react';

const Context = createContext();


const StateContext = ({ children }) => {

  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);
  const [matches, setMatches] = useState([]);
  const [playerVal, setPlayerVal] = useState([]);


  const handlePlayerSubmit = (e) => {
    e.preventDefault();
    setPlayers([...players, { name: e.target[0].value }]);
    e.target[0].value = '';
  };


  // My solution
  const orderPlayersByWins = () => {
    let totalGames = matches.length;
    console.log("Total Games", totalGames);
    let wins = {};
    matches.forEach((match) => {
      if (wins[match.winner]) {
        wins[match.winner] += 1;
      } else {
        wins[match.winner] = 1;
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


  const handleAdd = () => {
    const abc = [...playerVal, []]
    setPlayerVal(abc)
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
    const game = form.elements["game"] ? form.elements["game"].value : "";
    const winner = form.elements["winner"] ? form.elements["winner"].value : "";

    // Create a new object with player values
    let match = {};
    players.forEach((player, index) => {
      match[`player${index + 1}`] = player;
    });

    // Add the game and winner to the match object
    match.game = game;
    match.winner = winner;

    setMatches([...matches, match]);
    console.log(matches);
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
      handleAdd,
      handleGameSubmit,
      handleMatchSubmit
    }}>
      {children}
    </Context.Provider>
  );
};

export { StateContext, Context };