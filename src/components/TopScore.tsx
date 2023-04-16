import { observer } from 'mobx-react-lite';
import { SudokuGameModel } from 'src/SudokuGameModel';

interface TopScoreProps {
  game: SudokuGameModel;
}

export const TopScore = observer<TopScoreProps>(({ game }) => {
  return <p>Top score: {game.topScore}</p>;
});
