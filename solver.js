var boardSize;
var pieces;
var board;
var placed;

exports.init = function (size, basePieces) {
  boardSize = size;
  pieces = basePieces;
  board = [];

  for (let x = 0; x < size; x++) {
    board[x] = [];
    for (let y = 0; y < size; y++) {
      board[x][y] = 0;
    }
  }

  placed = [];

  for (let i = 0; i < pieces.length; i++) {
    placed[i] = false;
  }
};

exports.findSolution = function (onComplete) {
  fillBoard(0, 0, onComplete);
};

function fillBoard(x, y, onComplete) {
  for (var i = 0; i < pieces.length; i++) {
    if (!placed[i] && checkAndPlaceBothWays(i, x, y, onComplete)) {
      return true;
    }
  }
  return false;
}

function checkAndPlaceBothWays(piecesIndex, x, y, onComplete) {
  return (
    checkAndPlaceOneWay(piecesIndex, false, x, y, onComplete) ||
    checkAndPlaceOneWay(piecesIndex, true, x, y, onComplete)
  );
}

function checkAndPlaceOneWay(piecesIndex, rotated, x, y, onComplete) {
  var piece = pieces[piecesIndex];
  var width = rotated ? piece[1] : piece[0];
  var height = rotated ? piece[0] : piece[1];

  if (checkAndPlace(x, y, width, height, piecesIndex + 1)) {
    placed[piecesIndex] = true;

    if (allPlaced()) {
      onComplete(pieces, board);
      return true;
    }

    if (
      findNextCorner(x, y, function (x, y) {
        return fillBoard(x, y, onComplete);
      })
    ) {
      return true;
    }

    unPlace(x, y, width, height);
    placed[piecesIndex] = false;
  }

  return false;
}

function findNextCorner(startX, startY, callback) {
  for (let y = startY; y < boardSize; y++) {
    for (let x = y === startY ? startX : 0; x < boardSize; x++) {
      if (!board[x][y]) {
        return callback(x, y);
      }
    }
  }
  return false;
}

function checkAndPlace(x, y, width, height, value) {
  if (x + width > boardSize || y + height > boardSize) {
    return false;
  }

  // check the corners first
  if (
    board[x + width - 1][y] ||
    board[x][y + height - 1] ||
    board[x + width - 1][y + height - 1]
  )
    return false;

  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      if (!board[i][j]) {
        board[i][j] = value;
      } else {
        // oops! something's here; better clean up our mess...
        for (let l = x; l <= i; l++) {
          for (let m = y; m < (i === l ? j : y + height); m++) {
            board[l][m] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function unPlace(x, y, width, height) {
  for (let i = x; i < x + width; i++) {
    for (let j = y; j < y + height; j++) {
      board[i][j] = 0;
    }
  }
}

function allPlaced() {
  for (let i = 0; i < placed.length; i++) {
    if (!placed[i]) {
      return false;
    }
  }

  return true;
}
