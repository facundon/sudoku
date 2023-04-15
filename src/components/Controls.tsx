import { SudokuGameModel } from 'src/SudokuGameModel';
import './Controls.css';

interface ControlsProps {
  game: SudokuGameModel;
}

export const Controls: React.FC<ControlsProps> = ({ game }) => {
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
