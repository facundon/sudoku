import React from 'react';
import { observer } from 'mobx-react-lite';
import { Cell } from './Cell';
import { SudokuGameModel } from 'src/SudokuGameModel';
import type { Row } from 'src/Sudoku';
import './SudokuMatrix.css';

interface RowProps {
  row: Row;
  rowIndex: number;
  game: SudokuGameModel;
}

const Row = observer<RowProps>(({ row, game, rowIndex }) => {
  return (
    <div className='column'>
      {row.map((cell, i) => {
        const showDivider = (i + 1) % 3 === 0 && i !== row.length - 1;
        return (
          <React.Fragment key={cell.toString() + i}>
            <Cell
              onClick={() => game.setCellSelected([rowIndex, i])}
              isSelected={game.cellSelected ? game.cellSelected[0] === rowIndex && game.cellSelected[1] === i : false}
              isHighlighted={game.highlightNumber === cell}
            >
              {cell || ''}
            </Cell>
            {showDivider && <div className='v-divider' />}
          </React.Fragment>
        );
      })}
    </div>
  );
});

interface SudokuMatrixProps {
  game: SudokuGameModel;
}

export const SudokuMatrix = observer<SudokuMatrixProps>(({ game }) => {
  return (
    <div className='row'>
      {game.matrix.map((row, i) => {
        const showDivider = (i + 1) % 3 === 0 && i !== game.matrix.length - 1;
        return (
          <React.Fragment key={row.toString() + i}>
            <Row row={row} rowIndex={i} game={game} />
            {showDivider && <div className='h-divider' />}
          </React.Fragment>
        );
      })}
    </div>
  );
});
