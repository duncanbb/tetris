class Player {
  constructor(tetris) {
    this.position = {x: null, y: null};
    this.nextPiece = createPiece('T');
    this.currentPiece = createPiece('J');
    this.score = 0;
    this.tetris = tetris;
    this.board = tetris.board;
    this.hold = [];

    this.canSwap = true;
    // zero means the player can swap - any value higher than zero means they
    // can't - this allows us to decrement this value each time a piece reaches
    // the bottom
    this.pieces = 'ILJOSTZ';

    // if you just swapped you can't swap again next round
    // boolean for canSwap ? that gets reset at reset when
    // round finishes with canSwap = true?

    this.dropCounter = 0;
    this.dropInterval = 1000;
    this.reset();
    this.updateScore();
  }

  swap(){
    console.log(this.canSwap && this.hold.length);
    if (this.canSwap && this.hold.length === 0) {
      this.hold.push(this.currentPiece);
      this.currentPiece = this.nextPiece;
      this.nextPiece = this.randomPiece();
      this.recenterPiece();

    } else if (this.canSwap && this.hold.length === 1) {
      [this.currentPiece, this.nextPiece] =
      [this.hold.pop(), this.currentPiece];
      this.recenterPiece();
    }

    this.canSwap = false;

  }

  fall(instaDrop = false) {
    if (instaDrop) {
      while (!this.board.hit(this)) {
        this.position.y++;
      }
    } else {
      this.position.y++;
    }
    this.dropCounter = 0;
    if (this.board.hit(this)) {
      this.position.y--;
      this.board.update(this);
      this.reset();
      let lastScore = this.score;
      this.score += this.board.clearLines();
      this.updateScore();
      this.dropInterval -= this.score - lastScore;
    }
  }

  instaDrop(){
    this.position.y = 19;
    this.dropCounter = 0;
  }

  randomPiece(){
    return createPiece(this.pieces[this.pieces.length * Math.random() | 0]);
  }

  recenterPiece(){
    this.position.y = 0;
    this.position.x = (this.board.matrix[0].length / 2 | 0) -
                        (this.currentPiece[0].length / 2 | 0);
  }

  reset() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = this.randomPiece();
    this.recenterPiece();
    this.canSwap = true;

    if (this.board.hit(this)) {
      this.board.clear();
      this.score = 0;
      this.dropInterval = 1000;
    }
  }

  // review this function and why rotate piece inner loop has to be x < y

  rotatePiece(piece, dir) {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < y; x++) {
        [
          piece[x][y],
          piece[y][x]
        ] = [
          piece[y][x],
          piece[x][y]
        ];
      }
    }
    if (dir > 0) {
      piece.forEach(row => row.reverse());
    } else {
      piece.reverse();
    }
  }

  slide(dir) {
    this.position.x += dir;
    if (this.board.hit(this)) {
      this.position.x = this.position.x - dir;
    }
  }

  spin(dir) {
    const pos = this.position.x;
    let shift = 1;
    this.rotatePiece(this.currentPiece, dir);
    while (this.board.hit(this)) {
      this.position.x += shift;
      shift = -shift + shift > 0 ? 1 : -1;
      if (shift > this.currentPiece[0].length){
        this.position.x = pos;
        this.rotatePiece(this.currentPiece, -dir);
        return;
      }
    }
  }

  update(timeElapsed) {
    this.dropCounter += timeElapsed;
    if (this.dropCounter > this.dropInterval) {
      this.fall();
      }
  }

  updateScore() {
    document.getElementById('score').innerText = "score: " + this.score;
  }
}
