import React, { useEffect } from 'react'
import NavBar from '../components/NavBar';
import { useParams } from "react-router-dom";
import axios from 'axios';

const AllPlayers = () => {


  const { group_id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/game/stats/table/${group_id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);



  return (
    <>
      <NavBar />

    </>
  )
}

export default AllPlayers;