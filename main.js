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

function updateScore() {
  document.getElementById('score').innerText = tetris.player.score;
}

const tetris = new Tetris(canvas);

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 83:
      player.fall();
      return;
    case 65:
      player.slide(-1);
      return;
    case 68:
      player.slide(1);
      return;
    case 81:
      player.spin(-1);
      return;
    case 87:
      player.spin(1);
      return;
  }
});

updateScore();
