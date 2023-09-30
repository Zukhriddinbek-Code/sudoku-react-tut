import { util } from "./util.js";

let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function isValidPlace(grid, row, col, num) {
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === num) {
      return false;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num) {
      return false;
    }
  }
  let localBoxRow = row - (row % 3);
  let localBoxCol = col - (col % 3);
  for (let i = localBoxRow; i < localBoxRow + 3; i++) {
    for (let j = localBoxCol; j < localBoxCol + 3; j++) {
      if (grid[i][j] === num) {
        return false;
      }
    }
  }
  return true;
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let guess = 1; guess < 10; guess++) {
          if (isValidPlace(grid, row, col, guess)) {
            grid[row][col] = guess;
            if (solve(grid)) {
              return true;
            }
            grid[col][row] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

const createPuzzle = () => {
  // this code is to create 9x9 grid 2d array with 0s instead of hard coded sudoku
  let puzzle = getRandomSudoku();

  //here below we are solving the sudoku
  solve(puzzle);

  //here we are creating random number if it is greater than 0.3 we put 0 in that puzzle[i][j]
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (Math.random() > 0.3) {
        puzzle[i][j] = 0;
      }
    }
  }
  return puzzle;
};

//in the above case we are starting with the same sudoku that is why we are getting same sudoku solution, so we need so randomness
const getRandomSudoku = () => {
  let randomSudoku = [];
  for (let i = 0; i < 9; i++) {
    randomSudoku[i] = Array(9).fill(0);
  }
  for (let i = 0; i < 8; i++) {
    let number = Math.floor(Math.random() * 8) + 1;
    while (!isValidPlace(randomSudoku, 0, i, number)) {
      number = Math.floor(Math.random() * 8) + 1;
    }
    randomSudoku[0][i] = number;
  }
  return randomSudoku;
};

// let solution = [];
// util.copyGrid(board, solution);

let puzzle = createPuzzle();
solve(puzzle);
util.print2DArray(puzzle);
