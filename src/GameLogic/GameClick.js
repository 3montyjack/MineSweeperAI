var gameState = require('./Winning.js');

var board = []

//Returns the board in one array with the win and loss in other spaces in the Array
//[gameBoard, win, loss] and win and loss are booleans

export function clickSpace(x, y, gameBoard, flagging) {
  var win = false;
  var lose = false;
  board = gameBoard;
  var revealed0 = false;

  if (!flagging) {
    console.log(x,y)
    if (board[y][x][0] === 0) {
      reveal0s(y, x)
      revealed0 = true;
    } else {
      board[y][x][1] = true;
      lose = gameState.lose(gameBoard);
    }
    win = gameState.winning(gameBoard);
  } else {
    console.log("Flagging")
    board[y][x][2] = "F";
  }
  console.log(win,lose);
  return [board, win, lose, revealed0];
}

function reveal0s(y, x) {
  if (board[y][x][1] !== true) {
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i + y < board.length &&
          j + x < board[0].length &&
          i + y >= 0 &&
          j + x >= 0) {
          if (board[y + i][x + j][0] === 0) {
            board[y][x][1] = true;
            reveal0s(y + i, x + j, board);
          } else {
            board[y + i][x + j][1] = true;
          }
        }
      }
    }
  }
}
