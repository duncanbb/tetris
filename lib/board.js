class Board {
  constructor(w, h) {
    let matrix = [];
    while (h--) {
      matrix.push(new Array(w).fill(0));
    }
    this.matrix = matrix;
  }

  clear() {
    this.matrix.forEach(row => row.fill(0));
    alert('Game over!');
  }

  clearLines() {
    let rowsCleared = 1;
    outer: for (let y = this.matrix.length - 1; y > 0; --y) {
      for (let x = 0; x < this.matrix[y].length; ++x) {
        if (this.matrix[y][x] === 0) {
          continue outer;
        }
      }
      let currentRow = this.matrix.splice(y, 1)[0].fill(0);
      this.matrix.unshift(currentRow);
      ++y;
      player.score += rowsCleared * 10;
      rowsCleared *= 2;
      player.dropInterval -= 1;
      updateScore();
      // since we removed a row
    }
  }

  hit(player) {
    const [pieceShape, piecePos] = [player.currentPiece, player.position];
    for (let y = 0; y < pieceShape.length; ++y) {
      for (let x = 0; x < pieceShape[y].length; ++x) {
        if (pieceShape[y][x] !== 0 &&
            (this.matrix[y + piecePos.y] &&
            this.matrix[y + piecePos.y][x + piecePos.x]) !== 0) {
            return true;
        }
      }
    }
    return false;
  }

  update(player) {
    player.currentPiece.forEach((row, yIndex) => {
      row.forEach((value, xIndex) => {
        if (value !== 0) {
          this.matrix[yIndex + player.position.y]
               [xIndex + player.position.x] = value;
        }
      });
    });
  }


}
