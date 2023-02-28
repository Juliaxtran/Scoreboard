import './App.css';
import { StateContext } from './context/StateContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScoreBoard from './pages/ScoreBoard';
import Dashboard from './pages/Dashboard';

const App = () => {

  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<ScoreBoard />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter >
    </StateContext>
  );
}

export default App;
