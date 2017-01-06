const canvas = document.getElementById('tetris');

function createPiece(type) {
  switch (type) {
    case "I":
      return (
        [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
        ]
      );
    case "J":
      return (
        [
          [0, 2, 0],
          [0, 2, 0],
          [2, 2, 0],
        ]
      );
    case "L":
      return (
        [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3],
        ]
      );
    case "T":
      return (
        [
          [0, 4, 0],
          [4, 4, 4],
          [0, 0, 0]
        ]
      );
    case "S":
      return (
        [
          [0, 5, 5],
          [5, 5, 0],
          [0, 0, 0]
        ]
      );
    case "O":
      return (
        [
          [6, 6],
          [6, 6],
        ]
      );
    case "Z":
      return (
        [
          [7, 7, 0],
          [0, 7, 7],
          [0, 0, 0]
        ]
      );
  }
}

const tetris = new Tetris(canvas);

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
