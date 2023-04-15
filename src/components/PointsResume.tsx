import { SudokuGameModel } from 'src/SudokuGameModel';
import './PointsResume.css';
import { observer } from 'mobx-react-lite';

interface PointsResumeProps {
  game: SudokuGameModel;
}

export const PointsResume = observer<PointsResumeProps>(({ game }) => {
  return (
    <div className='points-wrapper'>
      <p>Points: {game.points}</p>
      <p>Mistakes: {game.errors}</p>
    </div>
  );
});
