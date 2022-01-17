class Puzzle {
  constructor(size, basePieces) {
    this.boardSize = size;
    this.pieces = basePieces;
    this.board = this.setupEmptyBoard(size);
    this.placed = Array(basePieces.length).fill(false);
  }

  setupEmptyBoard(size) {
    const board = [];

    for (let x = 0; x < size; x++) {
      board[x] = [];
      for (let y = 0; y < size; y++) {
        board[x][y] = 0;
      }
    }

    return board;
  }

  findNextCorner(startX, startY, callback) {
    for (let y = startY; y < this.boardSize; y++) {
      for (let x = y === startY ? startX : 0; x < this.boardSize; x++) {
        const isPositionEmpty = !this.board[x][y];

        if (isPositionEmpty) {
          return callback(x, y);
        }
      }
    }
    return false;
  }

  placeAndSolve(piecesIndex, isRotated, x, y, onComplete) {
    const piece = this.pieces[piecesIndex];
    const width = isRotated ? piece[1] : piece[0];
    const height = isRotated ? piece[0] : piece[1];

    const isPlaced = this.tryToPlace(x, y, width, height, piecesIndex + 1);

    if (isPlaced) {
      this.placed[piecesIndex] = true;

      if (this.areAllPiecesPlaced()) {
        onComplete(this.pieces, this.board);
        return true;
      }

      const isSolved = this.findNextCorner(x, y, (x, y) =>
        this.fillBoard(x, y, onComplete)
      );

      if (isSolved) {
        return true;
      }

      // no solution with piece at this location
      this.unPlace(x, y, width, height);
      this.placed[piecesIndex] = false;
    }

    return false;
  }

  tryToPlace(x, y, width, height, value) {
    const isOutsideBoard =
      x + width > this.boardSize || y + height > this.boardSize;

    if (isOutsideBoard) {
      return false;
    }

    // Check if there is already another piece at the corners
    const topRightCorner = this.board[x + width - 1][y];
    const bottomLeftCorner = this.board[x][y + height - 1];
    const bottomRightCorner = this.board[x + width - 1][y + height - 1];

    if (topRightCorner || bottomLeftCorner || bottomRightCorner) {
      return false;
    }

    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        const isEmpty = !this.board[i][j];

        if (isEmpty) {
          this.board[i][j] = value;
        } else {
          // We encountered another piece, remove what we have just placed
          for (let l = x; l <= i; l++) {
            const isLastRow = i === l;
            for (let m = y; m < (isLastRow ? j : y + height); m++) {
              this.board[l][m] = 0;
            }
          }
          return false;
        }
      }
    }

    return true;
  }

  unPlace(x, y, width, height) {
    for (let i = x; i < x + width; i++) {
      for (let j = y; j < y + height; j++) {
        this.board[i][j] = 0;
      }
    }
  }

  areAllPiecesPlaced() {
    for (let i = 0; i < this.placed.length; i++) {
      if (!this.placed[i]) {
        return false;
      }
    }

    return true;
  }

  placeAndTryToSolveWithEitherRotation(piecesIndex, x, y, onComplete) {
    return (
      this.placeAndSolve(piecesIndex, false, x, y, onComplete) ||
      this.placeAndSolve(piecesIndex, true, x, y, onComplete)
    );
  }

  fillBoard(x, y, onComplete) {
    for (let i = 0; i < this.pieces.length; i++) {
      const isPiecePlaced = this.placed[i];

      if (isPiecePlaced) {
        continue;
      }

      const isSolved = this.placeAndTryToSolveWithEitherRotation(
        i,
        x,
        y,
        onComplete
      );

      if (isSolved) {
        return true;
      }
    }

    return false;
  }

  findSolution(onComplete) {
    this.fillBoard(0, 0, onComplete);
  }
}

module.exports = Puzzle;
