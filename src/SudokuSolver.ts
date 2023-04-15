import { Sudoku } from './Sudoku';

export type Clue = [number, number];

export class SudokuSolver {
  sudoku: Sudoku;

  constructor(sudoku: Sudoku) {
    this.sudoku = sudoku;
  }

  getRandomCellIndex(): number {
    return Math.floor(Math.random() * this.sudoku.matrixSize);
  }

  getRandomClue(): Clue {
    return [this.getRandomCellIndex(), this.getRandomCellIndex()];
  }

  getClues(ammount: number = 25): Clue[] {
    if (ammount > this.sudoku.matrixSize * this.sudoku.matrixSize)
      throw Error(`Can't get more clues than ${this.sudoku.matrixSize * this.sudoku.matrixSize}`);
    if (ammount < 17) throw Error(`If less than 17 clues, sudoku might have more than 1 solution`);

    const clues: Clue[] = [];
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
