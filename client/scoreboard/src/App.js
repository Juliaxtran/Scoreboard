
import './App.css';
import { useState } from 'react';


function App() {
  let [players, setPlayers] = useState([]);
  let [games, setGames] = useState([]);
  let [matches, setMatches] = useState([]);

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
    const player1 = e.target[0].value;
    const player2 = e.target[1].value;
    const game = e.target[2].value;
    const winner = e.target[3].value;
    setMatches([...matches, { player1, player2, game, winner }]);
  };


// Copilot's suggestion
  // const orderPlayersByWins = () => {
  //   let totalGames = matches.length;
  //   console.log("Total Games" , totalGames);
  //   let wins = {};
  //   matches.forEach((match) => {
  //     if (wins[match.winner]) {
  //       wins[match.winner] += 1;
  //     } else {
  //       wins[match.winner] = 1;
  //     }
  //   });
  //     console.log("Wins" , wins);
  //   let winPercentage = {};
  //   for (let player in wins) {
  //     winPercentage[player] = Math.floor((wins[player] / totalGames) * 100);
  //   }
  //   console.log("Win Percentage" , winPercentage);
  //   let rank = {};
  //   for (let player in winPercentage) {
  //     if (winPercentage[player] >= 50) {
  //       rank[player] = "A";
  //     } else if (winPercentage[player] >= 40) {
  //       rank[player] = "B";
  //     } else if (winPercentage[player] >= 30) {
  //       rank[player] = "C";
  //     } else if (winPercentage[player] >= 20) {
  //       rank[player] = "D";
  //     } else if (winPercentage[player] >= 10) {
  //       rank[player] = "E";
  //     } else {
  //       rank[player] = "F";
  //     }
  //   }
  //   console.log("Rank" , rank);
  //   let orderedPlayers = [];
  //   for (let player in rank) {
  //     if (rank[player] === "A") {
  //       orderedPlayers.push(player);
  //     }
  //   }
  //   for (let player in rank) {
  //     if (rank[player] === "B") {
  //       orderedPlayers.push(player);
  //     }
  //   }
  //   for (let player in rank) {
  //     if (rank[player] === "C") {
  //       orderedPlayers.push(player);
  //     }
  //   }
  //   for (let player in rank) {
  //     if (rank[player] === "D") {
  //       orderedPlayers.push(player);
  //     }
  //   }
  //   for (let player in rank) {
  //     if (rank[player] === "E") {
  //       orderedPlayers.push(player);
  //     }
  //   }
  //   for (let player in rank) {
  //     if (rank[player] === "F") {
  //       orderedPlayers.push(player);
  //     }
  //   }
  //   console.log("Ordered Players" , orderedPlayers);
  // };

  // My solution
  const orderPlayersByWins = () => {
    let totalGames = matches.length;
    console.log("Total Games" , totalGames);
    let wins = {};
    matches.forEach((match) => {
      if (wins[match.winner]) {
        wins[match.winner] += 1;
      } else {
        wins[match.winner] = 1;
      }
    });
      console.log("Wins" , wins);
    let winPercentage = {};
    for (let player in wins) {
      winPercentage[player] = (wins[player] / totalGames) * 100;
    }
    console.log("Win Percentage" , winPercentage);
    let orderedPlayers = Object.keys(wins).sort((a, b) => wins[b] - wins[a]);
    console.log("Ordered Players" , orderedPlayers);
  };






  return (
    <div className="App">
      <h1>Scoreboard</h1>



      <div className='forms'>
        {/* Add players */}
        <div className="form">
          <form onSubmit={handlePlayerSubmit}>
            <input type="text"
              placeholder="Player Name"
            />
            <button type="submit">Add Player</button>
          </form>
          {/* Show Players */}
          {players && players.map((player, index) => {
            return (
              <div key={index}>
                <h2>{player.name}</h2>
              </div>)
          })}
        </div>

        {/* Add Games */}
        <div className="form">
          <form onSubmit={handleGameSubmit}>
            <input type="text"
              placeholder="Game Name" />
            <button type="submit">Add Game</button>
          </form>
          {/* Show Games */}
          {games && games.map((game, index) => {
            return (
              <div key={index}>
                <h2>{game.name}</h2>
              </div>)
          })}
        </div>

        {/* Matches */}
        <div className='form'>
          <h2>Matches</h2>
          <form className='matches' onSubmit={handleMatchSubmit}>
            <label>Player 1</label>
            <select>
              {players.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <label>Player 2</label>
            <select>
              {players.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <label>Game</label>
            <select>
              {games.map((game, index) => (
                <option key={index} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>
            <label>Winner</label>
            <select>
              {players.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Match</button>
          </form>
        </div>
        {/* Show matches */}
        <div className="matches-list">
          <h2>Matches</h2>
          {matches.map((match, index) => (
            <div key={index}>
              <p>Player 1: {match.player1}</p>
              <p>Player 2: {match.player2}</p>
              <p>Game: {match.game}</p>
              <p>Winner: {match.winner}</p>
            </div>
          ))}
        </div>
        {/* Determine Wins */}
        <div className="wins">
          <h2>Wins</h2>
          <button onClick={orderPlayersByWins}>
            Determine Wins
          </button>




          </div>


      </div>
    </div>

  );
}

export default App;
