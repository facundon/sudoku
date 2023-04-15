import 'normalize.css';
import './App.css';
import { SudokuMatrix } from './components/SudokuMatrix';
import { SudokuGameModel } from './SudokuGameModel';
import { useState } from 'react';

function App() {
  const [game] = useState(new SudokuGameModel());

  return (
    <div className='container'>
      <SudokuMatrix game={game} />
    </div>
  );
}

export default App;
