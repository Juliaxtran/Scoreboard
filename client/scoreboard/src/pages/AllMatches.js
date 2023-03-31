import React from 'react'
import NavBar from '../components/NavBar';
import { useParams, Link } from "react-router-dom";
import { Button } from '@mui/material';
import axios from 'axios';
import { Context } from '../context/StateContext';
import { useContext, useEffect } from 'react';


const AllMatches = () => {

  const { group_id } = useParams();

  const { setMatches, matches } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/match/${group_id}`, { withCredentials: true })
      .then((res) => {
        setMatches(res.data.matches);
      });
  }, [group_id, setMatches]);

  return (
    <>
  <NavBar />
  <h2>All Matches </h2>
  <table>
      <thead>
        <tr>
          <th>Match ID</th>
          <th>Game Name</th>
          <th>Player Names</th>
          <th>Winners</th>
          <th>Played On</th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match) => (
          <tr key={match.match_id}>
            <td>{match.match_id}</td>
            <td>{match.game_name}</td>
            <td>{match.player_names}</td>
            <td>{match.winners}</td>
            <td> {new Date(match.played_on).toISOString().slice(0, 10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <Link to={`/dashboard/${group_id}`}>
          <Button>Return to Dashboard</Button>
      </Link>
    </>
  )
}

export default AllMatches;