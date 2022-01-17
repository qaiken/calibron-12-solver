'use strict';
const Puzzle = require('../puzzle.js');

describe('Integration tests', function () {
  describe('#findSolution()', function () {
    it('should solve 4 pieces of area 1 in a 3x3 board (which is too big)', function () {
      let finalBoard;
      let doneCount = 0;

      const puzzle = new Puzzle(3, [
        [1, 1],
        [1, 1],
        [1, 1],
        [1, 1],
      ]);

      puzzle.findSolution(function (pieces, board) {
        finalBoard = board;
        doneCount++;
      });

      expect(finalBoard).toEqual([
        [1, 4, 0],
        [2, 0, 0],
        [3, 0, 0],
      ]);
      expect(doneCount).toEqual(1);
    });

    it('can exactly solve a small simple case', function () {
      let finalBoard;

      const puzzle = new Puzzle(3, [
        [1, 2],
        [1, 3],
        [2, 2],
      ]);

      puzzle.findSolution(function (pieces, board) {
        finalBoard = board;
      });

      expect(finalBoard).toEqual([
        [1, 1, 2],
        [3, 3, 2],
        [3, 3, 2],
      ]);
    });

    it('can exactly solve a more compelex case with duplicates', function () {
      let finalBoard;

      const puzzle = new Puzzle(5, [
        [1, 2],
        [1, 5],
        [2, 2],
        [2, 2],
        [2, 5],
      ]);

      puzzle.findSolution(function (pieces, board) {
        finalBoard = board;
      });

      expect(finalBoard).toEqual([
        [1, 1, 2, 5, 5],
        [3, 3, 2, 5, 5],
        [3, 3, 2, 5, 5],
        [4, 4, 2, 5, 5],
        [4, 4, 2, 5, 5],
      ]);
    });

    it('succeeds with a 1-piece case', function () {
      let finalBoard;

      const puzzle = new Puzzle(2, [[2, 2]]);

      puzzle.findSolution(function (pieces, board) {
        finalBoard = board;
      });

      expect(finalBoard).toEqual([
        [1, 1],
        [1, 1],
      ]);
    });

    it('fails to solve an impossible case', function () {
      let finalBoard;

      const puzzle = new Puzzle(2, [
        [1, 2],
        [1, 2],
        [1, 2],
      ]);

      puzzle.findSolution(function (pieces, board) {
        finalBoard = board;
      });

      expect(finalBoard).toBe(undefined);
    });
  });
});
