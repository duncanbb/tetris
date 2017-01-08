const canvas = document.getElementById('tetris');
const nextCanvas = document.getElementById('nextPiece');
const hold = document.getElementById('holdPiece');
const tetris = new Tetris(canvas, nextPiece, hold);

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 69:
      tetris.player.fall(true);
      return;
    case 83:
      tetris.player.fall();
      return;
    case 65:
      tetris.player.slide(-1);
      return;
    case 68:
      tetris.player.slide(1);
      return;
    case 81:
      tetris.player.spin(-1);
      return;
    case 87:
      tetris.player.spin(1);
      return;
    case 90:
      tetris.player.swap();
      return;
  }
});
