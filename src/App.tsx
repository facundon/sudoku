import { useState } from 'react';
import { Sudoku } from './Sudoku';
import type { Row } from './Sudoku';
import { SudokuGameModel } from './SudokuGameModel';
import 'normalize.css';
import './App.css';

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

function App() {
  const [{ matrix: unsolvedMatrix }] = useState(new SudokuGameModel());

  return (
    <div className='container'>
      <div className='row'>
        {unsolvedMatrix.map((row, i) => {
          const showDivider = (i + 1) % 3 === 0 && i !== unsolvedMatrix.length - 1;
          return (
            <>
              <Row row={row} key={row.toString() + i} />
              {showDivider && <div className='h-divider' />}
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
