import React,{ createContext, useState, useEffect } from 'react';
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
  const [groupName, setGroupName] = useState([]);


  useEffect(() => {
    axios.get('/api/profile', { withCredentials: true })
      .then(response => {
        setUser(response.data);
        console.log('i got data',response.data);
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





  return (
    <Context.Provider value={{
      players,
      games,
      matches,
      playerVal,
      setPlayerVal,
      setPlayers,
      setGames,
      setMatches,
      handleAddPlayer,
      handleAddWinner,
      winnerVal,
      user,
      setUser,
      groups,
      setGroups,
      handleDeletePlayer,
      handleDeleteWinner,
      groupName,
      setGroupName

    }}>
      {children}
    </Context.Provider>
  );
};

export { StateContext, Context};