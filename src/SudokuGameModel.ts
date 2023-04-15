import { action, makeObservable, observable } from 'mobx';
import { Matrix } from './Sudoku';
import { Coordinates, SudokuSolver } from './SudokuSolver';

export class SudokuGameModel {
  readonly pointsReference = { row: 100, col: 100, box: 100 } as const;
  readonly matrix: Matrix;
  readonly solver: SudokuSolver;
  errors: number = 0;
  points: number = 0;
  cellSelected: Coordinates | null = null;
  isGameEnded = false;

  constructor() {
    const solver = new SudokuSolver();
    this.solver = solver;
    this.matrix = solver.getInitialRandomMatrix();

    makeObservable(this, {
      matrix: observable,
      cellSelected: observable,
      setCellSelected: action.bound,
      assignValue: action.bound,
      setIsGameEnded: action.bound,
      isGameEnded: observable,
      errors: observable,
      points: observable,
    });
  }

  setCellSelected(coordinate: Coordinates): void {
    this.cellSelected = coordinate;
  }

  setIsGameEnded(value: boolean): void {
    this.isGameEnded = value;
  }

  assignValue(value: number): unknown {
    if (!this.cellSelected) return;

    const isValid = this.solver.isValidValue(value, this.cellSelected);
    if (!isValid) return this.errors++;

    this.matrix[this.cellSelected[0]][this.cellSelected[1]] = value;
    this.addPoints();
    if (this.matrix.every(row => row.every(Boolean))) this.setIsGameEnded(true);
    this.cellSelected = null;
  }

  addPoints(): void {
    // TODO: add timer based points
    if (!this.cellSelected) return;
    const row = this.matrix[this.cellSelected[0]];
    const col = this.matrix.map(row => row[this.cellSelected?.at(1) as number]);
    if (row.every(Boolean)) this.points += this.pointsReference.row;
    if (col.every(Boolean)) this.points += this.pointsReference.col;
    this.points++;
  }
}
