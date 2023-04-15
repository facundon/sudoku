import 'normalize.css';
import './App.css';
import { SudokuMatrix } from './components/SudokuMatrix';
import { SudokuGameModel, localStorageKeys } from './SudokuGameModel';
import { useState } from 'react';
import { Controls } from './components/Controls';
import { PointsResume } from './components/PointsResume';
import { RestartGameButton } from './components/RestartGameButton';
import { WinModal } from './components/WinModal';

export const MODAL_ROOT_ID = 'modal-root';

function App() {
  const [game] = useState(new SudokuGameModel());

  return (
    <>
      <div className='container' id='container'>
        <p>Top Score: {localStorage.getItem(localStorageKeys.topScore) ?? 0}</p>
        <RestartGameButton game={game} />
        <PointsResume game={game} />
        <SudokuMatrix game={game} />
        <Controls game={game} />
        <WinModal game={game} />
      </div>
      <div id={MODAL_ROOT_ID} className='modal-root' />
    </>
  );
}

export default App;
