import { action, makeObservable, observable } from 'mobx';
import { Matrix } from './Sudoku';
import { Coordinates, SudokuSolver } from './SudokuSolver';

export const localStorageKeys = {
  matrix: 'matrix',
  solvedMatrix: 'solvedMatrix',
  topScore: 'topScore',
  points: 'points',
  errors: 'errors',
} as const;

export class SudokuGameModel {
  readonly pointsReference = { row: 100, col: 100, box: 100 } as const;
  readonly solver: SudokuSolver;
  matrix: Matrix;
  errors: number = 0;
  points: number = 0;
  cellSelected: Coordinates | null = null;
  isGameEnded = false;

  constructor() {
    const oldMatrix = localStorage.getItem(localStorageKeys.matrix);
    const solvedMatrix = this.getSolvedMatrixFromStorage();
    const solver = new SudokuSolver(solvedMatrix);
    this.solver = solver;
    this.matrix = oldMatrix ? JSON.parse(oldMatrix) : solver.getInitialRandomMatrix();

    this.points = Number(localStorage.getItem(localStorageKeys.points)) ?? 0;
    this.errors = Number(localStorage.getItem(localStorageKeys.errors)) ?? 0;
    localStorage.setItem(localStorageKeys.matrix, JSON.stringify(this.matrix));
    localStorage.setItem(localStorageKeys.solvedMatrix, btoa(JSON.stringify(solver.getSolvedMatrix())));

    makeObservable(this, {
      matrix: observable,
      cellSelected: observable,
      setCellSelected: action.bound,
      assignValue: action.bound,
      setIsGameEnded: action.bound,
      isGameEnded: observable,
      errors: observable,
      points: observable,
      restart: action.bound,
    });
  }

  setCellSelected(coordinate: Coordinates): void {
    this.cellSelected = coordinate;
  }

  setIsGameEnded(value: boolean): void {
    this.isGameEnded = value;
  }

  restart(): void {
    this.solver.reset();
    this.matrix = this.solver.getInitialRandomMatrix();
    localStorage.setItem(localStorageKeys.matrix, JSON.stringify(this.matrix));
  }

  assignValue(value: number): void {
    if (!this.cellSelected) return;

    const isValid = this.solver.isValidValue(value, this.cellSelected);
    if (!isValid) {
      this.errors++;
      localStorage.setItem(localStorageKeys.errors, this.errors.toString());
      return;
    }

    this.matrix[this.cellSelected[0]][this.cellSelected[1]] = value;
    this.addPoints();

    localStorage.setItem(localStorageKeys.matrix, JSON.stringify(this.matrix));
    localStorage.setItem(localStorageKeys.points, this.points.toString());

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

    const topScore = Number(localStorage.getItem(localStorageKeys.topScore));
    if (this.points > topScore) localStorage.setItem(localStorageKeys.topScore, this.points.toString());
  }

  private getSolvedMatrixFromStorage(): Matrix | null {
    const oldSolvedMatrix = localStorage.getItem(localStorageKeys.solvedMatrix);
    if (!oldSolvedMatrix) return null;
    return JSON.parse(atob(oldSolvedMatrix)) as Matrix;
  }
}
