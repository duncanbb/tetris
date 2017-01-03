class Tetris {
  constructor(canvas) {

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
      requestAnimationFrame(update);
    };
    update();

  }

  drawShape(piece, location) {
    piece.forEach((row, yIndex) => {
      row.forEach((value, xIndex) => {
        if (value !== 0) {
          this.ctx.shadowBlur=20;
          this.ctx.shadowColor="black";
          this.ctx.fillStyle = this.colors[value];
          this.ctx.fillRect(xIndex + location.x,
            yIndex + location.y, 1, 1);
        }
      });
    });
  }

  draw() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawShape(this.player.currentPiece, this.player.position);
    this.drawShape(this.board.matrix, {x: 0, y:0});
  }

}
