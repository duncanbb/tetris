class Tetris {
  constructor(canvas, nextPiece, hold) {

    this.canvas = canvas;
    this.colors = [
      null,
      "#9242f4",
      "#427df4",
      "#bc0fb9",
      "#ad0014",
      "#107c3d",
      "#8db29c",
      "#58d64a",
    ];

    this.hold = hold;

    this.holdCtx = hold.getContext('2d');
    this.holdCtx.scale(14, 14);

    this.nextPiece = nextPiece;
    this.nextCtx = nextPiece.getContext('2d');
    this.nextCtx.scale(14, 14);
    this.ctx = canvas.getContext('2d');
    this.ctx.scale(20, 20);

    this.board = new Board(12, 20);
    this.player = new Player(this);


    let lastTime = 0;

    const update = (time = 0) => {
      let timeElapsed = time - lastTime;
      lastTime = time;

      this.player.update(timeElapsed);

      this.draw();
      this.drawPreview();
      this.drawHold();
      requestAnimationFrame(update);
      if (this.board.over) {
        document.addEventListener('click', event => {
          this.reset();
      });
    }
  };
  update();
}

  blackFill(ctx, paintArea) {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, paintArea.width, paintArea.height);
  }

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

  draw() {
    this.blackFill(this.ctx, this.canvas);
    this.drawShape(this.player.currentPiece, this.player.position, this.ctx);
    this.drawShape(this.board.matrix, {x: 0, y:0}, this.ctx);
  }

  drawPreview() {
    this.blackFill(this.nextCtx, this.nextPiece);
    this.drawShape(this.player.nextPiece, {x: 2, y: 2}, this.nextCtx);
  }

  drawHold() {
    this.blackFill(this.holdCtx, this.hold);
    this.drawShape(this.player.hold[0], {x: 2, y: 2}, this.holdCtx);
  }

  reset(){
    this.board.clear();
    this.board.over = false;
    this.player.score = 0;
    let elOver = document.getElementById("game-over");
    elOver.style.display = 'none';
  }

}
