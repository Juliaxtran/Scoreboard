import "./App.css";
import { StateContext } from "./context/StateContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScoreBoard from "./pages/ScoreBoard";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/LoginPage";
import AllPlayers from "./pages/AllPlayers";
import AllMatches from "./pages/AllMatches";
import AllGroups from "./pages/AllGroups";
import AllGames from "./pages/AllGames";
import Group from "./pages/Group";

const App = () => {
  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/group" element={<Group />} />
          <Route path="/test" element={<ScoreBoard />} />
          <Route path="/dashboard/:group_id" element={<Dashboard />} />
          <Route path="/players" element={<AllPlayers />} />
          <Route path="/matches" element={<AllMatches />} />
          <Route path="/groups" element={<AllGroups />} />
          <Route path="/games" element={<AllGames />} />
        </Routes>
      </BrowserRouter>
    </StateContext>
  );
};

export default App;
