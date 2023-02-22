import React, { useContext } from 'react';
import { Context } from '../context/StateContext';

const ScoreBoard = () => {

  const { players, games, matches, playerVal, orderPlayersByWins, handlePlayerSubmit, handleAdd, handleGameSubmit, handleMatchSubmit } = useContext(Context);


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
              playerVal.map((v, i) => {
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
              {Object.keys(match).map((player, playerIndex) => {
                if (player.includes("player") && player !== "player1" && player !== "player2") {
                  return <p key={playerIndex}>Player {playerIndex + 1}: {match[player]}</p>;
                }
                return null;
              })}
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
  )
}

export default ScoreBoard;