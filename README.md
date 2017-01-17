# Tetris

Tetris is a JavaScript puzzle game where the goal is to make and clear as many lines as possible. It uses HTML5 Canvas and retro styling.

[Live version](https://duncanbb.github.io/tetris/)

![alt text](https://raw.githubusercontent.com/duncanbb/duncanbb.github.io/master/images/fulls/tetris.png "Screenshot")

## Play Instructions

Play begins after the page loads. The goal of the game is to drop blocks into rows without leaving any gaps. A five square tall row that's cleared all at once is a Tetris and worth more points. Clearing two rows simultaneously is worth more points than one at a time. As you clear rows the pieces will fall faster. You can swap pieces by pressing Z, the first time this will put a piece into your hold and you will have to let the next piece drop. After that you can swap that piece in to replace your current piece. Space allows you to drop pieces instantly and spinning is accomplished by pressing X or Up Arrow.

## Technologies Used

#### [Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

An element added in HTML5 that allows for easing rendering of basic shapes. My draw functions all require access to the canvas so that they may display the location of pieces as they fall. This is the drawShape function which uses shadows to give the pieces a gridlike shape, the pieces are all symmetrical matrixes which simplifies the process of rotating them :

```javascript
drawShape(piece, location, area) {
  if (piece) {
    piece.forEach((row, yIndex) => {
      row.forEach((value, xIndex) => {
        if (value !== 0) {
          area.shadowBlur=20;
          area.shadowColor="black";
          area.fillStyle = this.colors[value];
          area.fillRect(xIndex + location.x,
            yIndex + location.y, 1, 1);
        }
      });
    });
  }
}
```

## Technical Implementation

### Falling

On initialization the player class sets a dropInterval to 1000 ms and a dropCounter to 0, when these values are equal the dropCounter is reset and a piece falls. The dropInterval is decremented by the player's change in score each time that the player scores. It also accepts an optional argument so that the fall function can be used for dropping pieces instantly, rather than rewriting and repeating what would be essentially the same code in another too similar function.

```javascript
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
```

### Moving Pieces

Accounting for collisions and handling them appropriately is key to capturing the feel of Tetris. Pieces can always rotate if they can be shifted to a position within range (which I set as half of the current piece's length). If they cannot rotate then they don't. Making the loop a while here is key, because otherwise it will check just one position and then revert, I was also happy to find a way to decrement/increment the shift value (the amount of x-spaces to move a piece) depending on its sign.

```javascript
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
```

The hit function from the board class allows the pieces to know whether their placement is correct. It iterates through the piece and its position, checking whether those spaces are currently occupied on the matrix that represents the game's board (the collection of all pieces that have fallen but not yet been cleared):

```javascript
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
```

#### Style & Implementation

The game's style is intended to recall the 80s which is for many people the first time they played the game. There was no holding back then so it was a bit harder, and a bit slower since there wasn't instadrop either! I chose not to use music because that Tetris music is embedded in everyone's brains and I didn't want to add to the problem.

### To-Do

- [ ] Consider adding multiplayer.
- [ ] Increase speed of game without the player having to clear lines.
- [ ] Add different themes.
