import { Matrix, Sudoku } from './Sudoku';

export type Coordinate = [number, number];

export class SudokuSolver {
  private readonly matrixSize: number;
  private readonly solvedMatrix: Matrix;
  private readonly initialMatrix: Matrix;

  constructor(sudoku: Sudoku) {
    this.matrixSize = sudoku.matrixSize;
    this.solvedMatrix = sudoku.getMatrix();
    this.initialMatrix = this.generateInitialMatrix();
  }

  getInitialMatrix(): Matrix {
    return this.initialMatrix;
  }

  private getRandomCellIndex(): number {
    return Math.floor(Math.random() * this.matrixSize);
  }

  private getRandomClue(): Coordinate {
    return [this.getRandomCellIndex(), this.getRandomCellIndex()];
  }

  private getClues(ammount: number = 25): Coordinate[] {
    const maxAmmount = this.matrixSize * this.matrixSize;
    if (ammount > maxAmmount) throw Error(`Can't get more clues than ${maxAmmount}`);
    if (ammount < 17) throw Error(`If less than 17 clues, sudoku might have more than 1 solution`);

    const clues: Coordinate[] = [];
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

  private generateInitialMatrix(): Matrix {
    const clues = this.getClues();
    const initialMatrix = Sudoku.getEmptyMatrix(this.matrixSize);
    clues.forEach(clue => {
      const rowIndex = clue[0];
      const colIndex = clue[1];
      initialMatrix[rowIndex][colIndex] = this.solvedMatrix[rowIndex][colIndex];
    });
    return initialMatrix;
  }
}
