import 'normalize.css';
import './App.css';
import { SudokuMatrix } from './components/SudokuMatrix';
import { SudokuGameModel } from './SudokuGameModel';
import { useState } from 'react';
import { Controls } from './components/Controls';
import { PointsResume } from './components/PointsResume';

function App() {
  const [game] = useState(new SudokuGameModel());

  return (
    <div className='container'>
      <PointsResume game={game} />
      <SudokuMatrix game={game} />
      <Controls game={game} />
    </div>
  );
}

export default App;
