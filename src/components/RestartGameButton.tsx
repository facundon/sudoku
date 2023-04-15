import { useState } from 'react';
import { Modal } from './Modal';
import { SudokuGameModel } from 'src/SudokuGameModel';

interface RestartGameButtonProps {
  game: SudokuGameModel;
}

export const RestartGameButton: React.FC<RestartGameButtonProps> = ({ game }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Restart</button>
      {isOpen ? (
        <Modal
          content='Are you sure you want to restart the game?'
          onCancel={() => setIsOpen(false)}
          onConfirm={() => {
            game.restart();
            setIsOpen(false);
          }}
        />
      ) : null}
    </>
  );
};
