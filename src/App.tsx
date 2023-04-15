import 'normalize.css';
import './App.css';
import { SudokuMatrix } from './components/SudokuMatrix';
import { SudokuGameModel } from './SudokuGameModel';
import { useState } from 'react';
import { Controls } from './components/Controls';
import { PointsResume } from './components/PointsResume';
import { RestartGameModal } from './components/RestartGameModal';

export const MODAL_ROOT_ID = 'modal-root';

function App() {
  const [game] = useState(new SudokuGameModel());

  return (
    <>
      <div className='container' id='container'>
        <RestartGameModal game={game} />
        <PointsResume game={game} />
        <SudokuMatrix game={game} />
        <Controls game={game} />
      </div>
      <div id={MODAL_ROOT_ID} className='modal-root' />
    </>
  );
}

export default App;
