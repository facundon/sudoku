import { SudokuGameModel } from 'src/SudokuGameModel';
import './PointsResume.css';
import { observer } from 'mobx-react-lite';
import { formatTime } from 'src/utils';

interface PointsResumeProps {
  game: SudokuGameModel;
}

export const PointsResume = observer<PointsResumeProps>(({ game }) => {
  return (
    <div className='points-wrapper'>
      <p>Points: {game.points}</p>
      <p>Time: {formatTime(game.time)}</p>
      <p>Mistakes: {game.errors}</p>
    </div>
  );
});
