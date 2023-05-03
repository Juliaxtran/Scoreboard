import './App.css';
import React from 'react';
import { StateContext } from './context/StateContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScoreBoard from './pages/ScoreBoard';
import Dashboard from './pages/Dashboard';
import Login from './pages/LoginPage'
import AllPlayers from './pages/AllPlayers';
import AllMatches from './pages/AllMatches';
import AllGames from './pages/AllGames'

import Group from './pages/Group';



const App = () => {

  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/group/player" element={<Group />} />
          <Route path="/test" element={<ScoreBoard />} />
          <Route path="/dashboard/:group_id" element={<Dashboard  />} />
          <Route path="/players/:group_id" element={<AllPlayers/>} />
          <Route path="/matches/:group_id" element={<AllMatches/>} />
          <Route path="/games/:group_id" element={<AllGames/>} />
        </Routes>
      </BrowserRouter >
    </StateContext>
  );
}

export default App;
