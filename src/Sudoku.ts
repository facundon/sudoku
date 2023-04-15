export type Cell = number;
export type Row = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type Matrix = [Row, Row, Row, Row, Row, Row, Row, Row, Row];

export class Sudoku {
  readonly matrixSize = 9;
  readonly sampleRow = Array.from({ length: this.matrixSize }, (_, i) => i + 1);
  private readonly matrix: Matrix;

  constructor() {
    this.matrix = Sudoku.getEmptyMatrix(this.matrixSize);
    this.fillMatrix();
  }

  static getEmptyMatrix(size: number): Matrix {
    return Array.from({ length: size }, () => Array.from({ length: size }, () => 0)) as Matrix;
  }

  getMatrix(): Matrix {
    return this.matrix;
  }

  getRandomMatrix(): Matrix {
    this.fillMatrix();
    return this.matrix;
  }

  private fillMatrix(rowIndex: number = 0, colIndex: number = 0): boolean {
    // Randomize the first row
    if (rowIndex === 0 && colIndex === 0) {
      this.matrix[rowIndex] = this.getRandomRow();
      return this.fillMatrix(rowIndex, colIndex + 1);
    }

    // If we've filled all the rows, we're done
    if (rowIndex === this.matrixSize) {
      return true;
    }

    // If we've filled all the columns in this row, move to the next row
    if (colIndex === this.matrixSize) {
      return this.fillMatrix(rowIndex + 1, 0);
    }

    // If this cell is already filled, move to the next column
    if (this.matrix[rowIndex][colIndex] !== 0) {
      return this.fillMatrix(rowIndex, colIndex + 1);
    }

    // Try all possible values for this cell
    for (let val = 1; val <= this.matrixSize; val++) {
      if (this.isValidNumber(val, rowIndex, colIndex)) {
        // If this value is valid, set it and move to the next column
        this.matrix[rowIndex][colIndex] = val;
        if (this.fillMatrix(rowIndex, colIndex + 1)) {
          return true;
        }
        // If we reach this point, the value did not lead to a valid solution, so unset it
        this.matrix[rowIndex][colIndex] = 0;
      }
    }

    // If none of the values worked, backtrack to the previous cell
    return false;
  }

  private getRandomRow(): Row {
    const array = [...this.sampleRow] as Row;
    // Reverse loop because of Fisher-Yates algorithm
    for (let i = this.sampleRow.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private isValidNumber(number: number, rowIndex: number, colIndex: number): boolean {
    // Build the current row & column where number will be inserted
    const row = this.matrix[rowIndex];
    const column = new Set<Cell>();
    this.matrix.forEach(row => column.add(row[colIndex]));

    // First  we check if the number already exists on the row or in the column
    if (row.includes(number) || column.has(number)) return false;

    // Now we check if the number already exists on the 3x3 sub-grid
    const subRow = Math.floor(rowIndex / 3) * 3;
    const subCol = Math.floor(colIndex / 3) * 3;
    for (let i = subRow; i < subRow + 3; i++) {
      for (let j = subCol; j < subCol + 3; j++) {
        if (this.matrix[i][j] === number) {
          return false;
        }
      }
    }
    return true;
  }
}
