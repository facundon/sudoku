import { SudokuGameModel } from 'src/SudokuGameModel';
import './Controls.css';
import { useEffect } from 'react';

interface ControlsProps {
  game: SudokuGameModel;
}

export const Controls: React.FC<ControlsProps> = ({ game }) => {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (!isNaN(Number(e.key)) && Number(e.key) !== 0) game.assignValue(Number(e.key));
    }
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className='wrapper'>
      {Array.from({ length: 9 }, (_, i) => (
        <button key={i} className='control' onClick={() => game.assignValue(i + 1)}>
          {i + 1}
        </button>
      ))}
    </div>
  );
};
