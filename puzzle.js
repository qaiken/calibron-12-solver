'use strict';
const solver = require('./solver.js');

const boardSize = 56;
const basePieces = [
  [32, 11],
  [32, 10],
  [28, 14],
  [28, 7],
  [28, 6],
  [21, 18],
  [21, 18],
  [21, 14],
  [21, 14],
  [17, 14],
  [14, 4],
  [10, 7],
];

const startTime = new Date().getTime();

function onComplete(pieces, board) {
  const endTime = new Date().getTime();

  printBoard(board);

  for (var index = 0; index < pieces.length; index++) {
    process.stdout.write(((index + 1) % 10) + ': ' + pieces[index] + '\n');
  }

  process.stdout.write(`Solved in ${(endTime - startTime) / 1000} seconds`);
}

function printBoard(board) {
  process.stdout.write('\n');

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      if (
        x > 0 &&
        x < boardSize - 1 &&
        y > 0 &&
        y < boardSize - 1 &&
        board[x][y] === 0
      ) {
        process.stdout.write(' ');
      } else {
        process.stdout.write('' + (board[x][y] % 10));
      }
      process.stdout.write(' ');
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n');
}

function main() {
  solver.init(boardSize, basePieces);
  solver.findSolution(onComplete);
}

main();
process.stdout.write('\n');
