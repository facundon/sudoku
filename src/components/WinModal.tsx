import { observer } from 'mobx-react-lite';
import { SudokuGameModel } from 'src/SudokuGameModel';
import { Modal } from './Modal';

interface WinModalProps {
  game: SudokuGameModel;
}

export const WinModal = observer<WinModalProps>(({ game }) => {
  return game.isGameEnded ? (
    <Modal
      content='You win! \n Do you want to start another game?'
      onCancel={() => game.setIsGameEnded(false)}
      onConfirm={() => {
        game.restart();
        game.setIsGameEnded(false);
      }}
    />
  ) : null;
});
