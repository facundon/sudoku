import { action, autorun, makeObservable, observable } from 'mobx';
import { Matrix } from './Sudoku';
import { Coordinates, SudokuSolver } from './SudokuSolver';

export const localStorageKeys = {
  matrix: 'matrix',
  solvedMatrix: 'solvedMatrix',
  topScore: 'topScore',
  points: 'points',
  errors: 'errors',
  time: 'time',
} as const;

export class SudokuGameModel {
  readonly pointsReference = { row: 100, col: 100, box: 100, base: 30 } as const;
  readonly solver: SudokuSolver;
  timerRef: NodeJS.Timer;
  topScore: number = 0;
  matrix: Matrix;
  errors: number = 0;
  points: number = 0;
  cellSelected: Coordinates | null = null;
  isGameEnded = false;
  time: number = 0;
  highlightNumber: number | null = null;

  constructor() {
    const oldMatrix = localStorage.getItem(localStorageKeys.matrix);
    const solvedMatrix = this.getSolvedMatrixFromStorage();
    const solver = new SudokuSolver(solvedMatrix);
    this.solver = solver;
    this.matrix = oldMatrix ? JSON.parse(oldMatrix) : solver.getInitialRandomMatrix();
    localStorage.setItem(localStorageKeys.solvedMatrix, btoa(JSON.stringify(solver.getSolvedMatrix())));

    this.points = Number(localStorage.getItem(localStorageKeys.points)) ?? 0;
    this.errors = Number(localStorage.getItem(localStorageKeys.errors)) ?? 0;
    this.time = Number(localStorage.getItem(localStorageKeys.time)) ?? 0;
    this.topScore = Number(localStorage.getItem(localStorageKeys.topScore)) ?? 0;

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
      incrementOneSecond: action.bound,
      time: observable,
      topScore: observable,
      setTopScore: action.bound,
      highlightNumber: observable,
      setHighlightNumber: action.bound,
    });

    autorun(() => {
      localStorage.setItem(localStorageKeys.matrix, JSON.stringify(this.matrix));
      localStorage.setItem(localStorageKeys.time, this.time.toString());
      localStorage.setItem(localStorageKeys.errors, this.errors.toString());
      localStorage.setItem(localStorageKeys.points, this.points.toString());
      localStorage.setItem(localStorageKeys.topScore, this.topScore.toString());
    });

    this.timerRef = setInterval(this.incrementOneSecond, 1000);
  }

  setCellSelected(coordinate: Coordinates): void {
    this.cellSelected = coordinate;
    this.setHighlightNumber(this.getCellValueByCoordinates());
  }

  setHighlightNumber(number: number | null): void {
    this.highlightNumber = number;
  }

  setIsGameEnded(value: boolean): void {
    this.isGameEnded = value;
  }

  setTopScore(value: number): void {
    this.topScore = value;
  }

  stopTimer(): void {
    clearInterval(this.timerRef);
  }

  restart(): void {
    this.solver.reset();
    this.matrix = this.solver.getInitialRandomMatrix();
    localStorage.setItem(localStorageKeys.matrix, JSON.stringify(this.matrix));
    localStorage.setItem(localStorageKeys.solvedMatrix, btoa(JSON.stringify(this.solver.getSolvedMatrix())));
    this.time = 0;
    this.errors = 0;
    this.points = 0;
    this.stopTimer();
    this.timerRef = setInterval(this.incrementOneSecond, 1000);
  }

  incrementOneSecond(): void {
    this.time++;
  }

  assignValue(value: number): void {
    const currCellValue = this.cellSelected ? this.getCellValueByCoordinates() : null;
    if (!this.cellSelected || currCellValue) return;

    const isValid = this.solver.isValidValue(value, this.cellSelected);
    if (!isValid) {
      this.errors++;
      return;
    }

    this.matrix[this.cellSelected[0]][this.cellSelected[1]] = value;
    this.addPoints();

    if (this.matrix.every(row => row.every(Boolean))) this.setIsGameEnded(true);
    this.cellSelected = null;
  }

  private addPoints(): void {
    if (!this.cellSelected) return;
    const row = this.matrix[this.cellSelected[0]];
    const col = this.matrix.map(row => row[this.cellSelected?.at(1) as number]);
    if (row.every(Boolean)) this.points += this.getPointsToAdd('row');
    if (col.every(Boolean)) this.points += this.getPointsToAdd('col');

    const subRow = Math.floor(this.cellSelected[0] / 3) * 3;
    const subCol = Math.floor(this.cellSelected[1] / 3) * 3;
    let assignBoxPoints = true;
    for (let i = subRow; i < subRow + 3; i++) {
      for (let j = subCol; j < subCol + 3; j++) {
        if (this.matrix[i][j] === 0) assignBoxPoints = false;
      }
    }
    if (assignBoxPoints) this.points += this.getPointsToAdd('box');

    this.points += this.getPointsToAdd('base');
    if (this.points > this.topScore) this.setTopScore(this.points);
  }

  private getPointsToAdd(kind: keyof typeof this.pointsReference): number {
    const maxPoints = this.pointsReference[kind];
    const maxTime = 8 * 60; // In seconds.

    const timeFactor = Math.max(0, (maxTime - this.time) / maxTime);
    const mistakeFactor = Math.max(0, 1 - this.errors / 10);

    const points = Math.floor(maxPoints * timeFactor * mistakeFactor);
    return points || maxPoints / 5;
  }

  private getCellValueByCoordinates(): number | null {
    if (!this.cellSelected) return null;
    return this.matrix[this.cellSelected[0]][this.cellSelected[1]];
  }

  private getSolvedMatrixFromStorage(): Matrix | null {
    const oldSolvedMatrix = localStorage.getItem(localStorageKeys.solvedMatrix);
    if (!oldSolvedMatrix) return null;
    return JSON.parse(atob(oldSolvedMatrix)) as Matrix;
  }
}
