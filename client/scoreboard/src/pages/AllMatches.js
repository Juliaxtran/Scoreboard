import React from 'react'
import NavBar from '../components/NavBar';
import { useParams, Link } from "react-router-dom";
import { Button , Box} from '@mui/material';
import axios from 'axios';
import { Context } from '../context/StateContext';
import { useContext, useEffect, useState} from 'react';

import CustomTable from '../components/CustomTable';


const AllMatches = () => {

  const { group_id } = useParams();
  const [matchData, setMatchData] = useState([]);
  const {setMatches} = useContext(Context);

  const transformData = (data) => {
    return data.map((match, index) => {
      const playedOn = new Date(match.played_on);
      const formattedPlayedOn = playedOn.toISOString().slice(0, 10);

      return {
        index: index + 1,
        gameName: match.game_name,
        playerNames: match.player_names,
        winners: match.winners,
        playedOn: formattedPlayedOn
      }
    });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:4000/match/${group_id}`, { withCredentials: true })
      .then((res) => {
        const matches = transformData(res.data.matches)
        setMatchData(matches);
      });
  }, [group_id, setMatches]);

  return (
    <>
  <NavBar />
  <h1 style={{textAlign: 'center', fontFamily: 'Electrolize', margin: '1em'}}>All Matches</h1>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 2 }}>
    <CustomTable data={matchData} headings={['Match', 'Game', 'Players', 'Winner(s)', 'Played On']}/>

          <Link to={`/dashboard/${group_id}`}>
          <Button>Return to Dashboard</Button>
    </Link>
    </Box>

    </>
  )
}

export default AllMatches;