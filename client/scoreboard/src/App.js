import './App.css';
import { StateContext } from './context/StateContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScoreBoard from './pages/ScoreBoard';

const App = () => {

  return (
    <StateContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ScoreBoard />} />
        </Routes>
      </BrowserRouter >
    </StateContext>
  );
}

export default App;
