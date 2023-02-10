
import './App.css';
import { useState } from 'react';


function App() {
  let [players, setPlayers] = useState([]);
  let [games, setGames] = useState([]);
  let [matches, setMatches] = useState([]);
  let [val, setVal] = useState([]);

  const handleAdd = () => {
    const abc = [...val, []]
    setVal(abc)
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
    const player1 = form.elements["player1"] ? form.elements["player1"].value : "";
    const player2 = form.elements["player2"] ? form.elements["player2"].value : "";
    const player3 = form.elements["player3"] ? form.elements["player3"].value : "";
    const player4 = form.elements["player4"] ? form.elements["player4"].value : "";
    const game = form.elements["game"] ? form.elements["game"].value : "";
    const winner = form.elements["winner"] ? form.elements["winner"].value : "";
    setMatches([...matches, { player1, player2, player3, player4, game, winner }]);
    console.log(matches);
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
            <select name="player1">
              {players.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>

            <label>Player 2</label>
            <select name="player2">
              {players.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>

             {/* Add multiple */}
             <button type='button' onClick={() => handleAdd()}>Add</button>
            {
              val.map((v, i) => {
                return (
                  <div key={i}>
                    <label>Player {i + 3}</label>
                    <select name={`player${i + 3}`}>
                      {players.map((player, index) => (
                        <option key={index} value={player.name}>
                          {player.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )
              }
              )

            }

            {/* <label>Player 3</label>
            <select name="player3">
              {players.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>

            <label>Player 4</label>
            <select name="player4">
              {players.map((player, index) => (
                <option key={index} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select> */}

            <label>Game</label>
            <select name="game">
              {games.map((game, index) => (
                <option key={index} value={game.name}>
                  {game.name}
                </option>
              ))}
            </select>

            <label>Winner</label>
            <select name="winner">
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
              {match.player3 && <p>Player 3: {match.player3}</p>}
              {match.player4 && <p>Player 4: {match.player4}</p>}
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
