const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');

ctx.fillStyle =  "#000";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.scale(20, 20);

let board = constructBoard(12, 20);

function clearBoard() {
  board.forEach(row => row.fill(0));
  alert('Game over!');
}

function constructBoard(w, h) {
  let newBoard = [];
  while (h--) {
    newBoard.push(new Array(w).fill(0));
  }
  return newBoard;
}

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

function clearLines() {
  let rowsCleared = 1;
  outer: for (let y = board.length - 1; y > 0; --y) {
    for (let x = 0; x < board[y].length; ++x) {
      if (board[y][x] === 0) {
        continue outer;
      }
    }
    let currentRow = board.splice(y, 1)[0].fill(0);
    board.unshift(currentRow);
    ++y;
    player.score += rowsCleared * 10;
    rowsCleared *= 2;
    dropInterval -= 1;
    updateScore();
    // since we removed a row
  }
}

function hit(board, player) {
  const [pieceShape, piecePos] = [player.currentPiece, player.position];
  for (let y = 0; y < pieceShape.length; ++y) {
    for (let x = 0; x < pieceShape[y].length; ++x) {
      if (pieceShape[y][x] !== 0 &&
          (board[y + piecePos.y] &&
          board[y + piecePos.y][x + piecePos.x]) !== 0) {
          return true;
      }
    }
  }
  return false;
}

const colors = [
  null,
  "#9242f4",
  "#427df4",
  "#bc0fb9",
  "#ad0014",
  "#107c3d",
  "#8db29c",
  "#58d64a",
];

function drawShape(piece, location) {
  piece.forEach((row, yIndex) => {
    row.forEach((value, xIndex) => {
      if (value !== 0) {
        ctx.fillStyle = colors[value];
        ctx.fillRect(xIndex + location.x,
          yIndex + location.y, 1, 1);
        ctx.strokeStyle = "red";
      }
    });
  });
}

function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawShape(player.currentPiece, player.position);
  drawShape(board, {x: 0, y:0});
}

function drop() {
  player.position.y++;
  dropCounter = 0;
  if (hit(board, player)) {
    player.position.y--;
    updateBoard(board, player);
    playerReset();
    clearLines();
  }
}

function updateBoard(board, player) {
  player.currentPiece.forEach((row, yIndex) => {
    row.forEach((value, xIndex) => {
      if (value !== 0) {
        board[yIndex + player.position.y]
             [xIndex + player.position.x] = value;
      }
    });
  });
}

function move(dir) {
  player.position.x += dir;
  if (hit(board, player)) {
    player.position.x = player.position.x - dir;
  }
}


// review this function and why rotate piece inner loop has to be x < y
function rotate(dir) {
  const pos = player.position.x;
  let shift = 1;
  rotatePiece(player.currentPiece, dir);
  while (hit(board, player)) {
    player.position.x += shift;
    shift = -shift + shift > 0 ? 1 : -1;
    if (shift > player.currentPiece[0].length){
      player.position.x = pos;
      rotatePiece(player.currentPiece, -dir);
      return;
    }
  }
}

function rotatePiece(piece, dir) {
  for (let y = 0; y < piece.length; ++y) {
    for (let x = 0; x < y; ++x) {
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


function playerReset() {
  const pieces = 'ILJOSTZ';
  player.currentPiece = createPiece(pieces[pieces.length * Math.random() | 0]);
  player.position.y = 0;
  player.position.x = (board[0].length / 2 | 0) -
                      (player.currentPiece[0].length / 2 | 0);

  if (hit(board, player)) {
    clearBoard();
    player.score = 0;
    dropInterval = 1000;
  }
}

let lastTime = 0;
let dropCounter = 0;
let dropInterval = 1000;

function update(time = 0) {
  timeElapsed = time - lastTime;
  lastTime = time;

  dropCounter += timeElapsed;
  if (dropCounter > dropInterval) {
    drop();
    }

  draw();
  requestAnimationFrame(update);
}

function updateScore() {
  document.getElementById('score').innerText = player.score;
}

document.addEventListener('keydown', event => {
  switch (event.keyCode) {
    case 83:
      drop();
      return;
    case 65:
      move(-1);
      return;
    case 68:
      move(1);
      return;
    case 81:
      rotate(-1);
      return;
    case 87:
      rotate(1);
      return;
  }
});

playerReset();
update();
updateScore();
