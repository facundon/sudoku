import { Matrix, Sudoku } from './Sudoku';

export type Coordinates = [number, number];

export class SudokuSolver {
  private matrixSize: number;
  private solvedMatrix: Matrix;

  constructor() {
    const sudoku = new Sudoku();
    this.matrixSize = sudoku.matrixSize;
    this.solvedMatrix = sudoku.getRandomMatrix();
  }

  reset(): void {
    const sudoku = new Sudoku();
    this.matrixSize = sudoku.matrixSize;
    this.solvedMatrix = sudoku.getRandomMatrix();
  }

  getInitialRandomMatrix(): Matrix {
    const clues = this.getClues();
    const initialMatrix = Sudoku.getEmptyMatrix(this.matrixSize);
    clues.forEach(clue => {
      const rowIndex = clue[0];
      const colIndex = clue[1];
      initialMatrix[rowIndex][colIndex] = this.solvedMatrix[rowIndex][colIndex];
    });
    return initialMatrix;
  }

  isValidValue(value: number, coordinates: Coordinates): boolean {
    const expectedValue = this.solvedMatrix[coordinates[0]][coordinates[1]];
    return value === expectedValue;
  }

  private getRandomCellIndex(): number {
    return Math.floor(Math.random() * this.matrixSize);
  }

  private getRandomClue(): Coordinates {
    return [this.getRandomCellIndex(), this.getRandomCellIndex()];
  }

  private getClues(ammount: number = 25): Coordinates[] {
    const maxAmmount = this.matrixSize * this.matrixSize;
    if (ammount > maxAmmount) throw Error(`Can't get more clues than ${maxAmmount}`);
    if (ammount < 17) throw Error(`If less than 17 clues, sudoku might have more than 1 solution`);

    const clues: Coordinates[] = [];
    for (let i = 1; i <= ammount; i++) {
      const newClue = this.getRandomClue();
      if (clues.some(clue => clue[0] === newClue[0] && clue[1] === newClue[1])) {
        i--;
        continue;
      }
      clues.push(newClue);
    }
    return clues;
  }
}
