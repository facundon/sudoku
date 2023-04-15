import { SudokuGameModel } from 'src/SudokuGameModel';
import type { Row } from 'src/Sudoku';
import './SudokuMatrix.css';

const EmptyField: React.FC = () => {
  return <div className='cell' />;
};

const Row: React.FC<{ row: Row }> = ({ row }) => {
  return (
    <div className='column'>
      {row.map((cell, i) => {
        const showDivider = (i + 1) % 3 === 0 && i !== row.length - 1;
        return (
          <>
            {cell ? (
              <span className='cell' key={cell.toString() + i}>
                {cell}
              </span>
            ) : (
              <EmptyField key={cell.toString() + i} />
            )}
            {showDivider && <div className='v-divider' />}
          </>
        );
      })}
    </div>
  );
};

interface SudokuMatrixProps {
  game: SudokuGameModel;
}

export const SudokuMatrix: React.FC<SudokuMatrixProps> = ({ game }) => {
  return (
    <div className='row'>
      {game.matrix.map((row, i) => {
        const showDivider = (i + 1) % 3 === 0 && i !== game.matrix.length - 1;
        return (
          <>
            <Row row={row} key={row.toString() + i} />
            {showDivider && <div className='h-divider' />}
          </>
        );
      })}
    </div>
  );
};
