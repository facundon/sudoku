import { action, makeObservable, observable } from 'mobx';
import { Matrix, Sudoku } from './Sudoku';
import { Coordinate, SudokuSolver } from './SudokuSolver';

export class SudokuGameModel {
  readonly matrix: Matrix;
  cellSelected: Coordinate | null = null;

  constructor() {
    const sudoku = new Sudoku();
    const solver = new SudokuSolver(sudoku);
    this.matrix = solver.getInitialMatrix();

    makeObservable(this, {
      matrix: observable,
      cellSelected: observable,
      setCellSelected: action.bound,
      assignValue: action.bound,
    });
  }

  setCellSelected(coordinate: Coordinate): void {
    this.cellSelected = coordinate;
  }

  assignValue(value: number): void {
    if (!this.cellSelected) return;

    this.matrix[this.cellSelected[0]][this.cellSelected[1]] = value;
    this.cellSelected = null;
  }
}
