'use strict';
const Puzzle = require('./puzzle.js');

// 56x56 unit square
const boardSize = 56;

// 12 pieces
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

function printBoard(board) {
  process.stdout.write('\n');

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const puzzlePieceIdx = board[x][y];
      process.stdout.write(`${String.fromCharCode(96 + puzzlePieceIdx)} `);
    }
    process.stdout.write('\n');
  }
  process.stdout.write('\n');
}

function printKey(pieces) {
  process.stdout.write('Letter: Piece');
  process.stdout.write('\n');

  for (let index = 1; index <= pieces.length; index++) {
    process.stdout.write(
      `${String.fromCharCode(96 + index)}: ${pieces[index - 1]}\n`
    );
  }

  process.stdout.write('\n');
}

function onComplete(pieces, board) {
  const endTime = new Date().getTime();
  const duration = (endTime - startTime) / 1000;

  printBoard(board);
  printKey(pieces);

  process.stdout.write(`Solved in ${duration} seconds`);
}

function main() {
  const puzzle = new Puzzle(boardSize, basePieces);
  puzzle.findSolution(onComplete);
}

main();
