import { makeObservable } from 'mobx';
import { Matrix, Sudoku } from './Sudoku';
import { Clue, SudokuSolver } from './SudokuSolver';

export class SudokuGameModel {
  matrix: Matrix;
  constructor() {
    const sudoku = new Sudoku();
    const solver = new SudokuSolver(sudoku);
    const clues = solver.getClues();
    this.matrix = sudoku.getEmptyMatrix();
    this.assignCluesToMatrix(clues, sudoku.matrix);

    makeObservable(this, {});
  }

  private assignCluesToMatrix(clues: Clue[], solvedMatrix: Matrix): void {
    clues.forEach(clue => {
      const rowIndex = clue[0];
      const colIndex = clue[1];
      this.matrix[rowIndex][colIndex] = solvedMatrix[rowIndex][colIndex];
    });
  }
}
