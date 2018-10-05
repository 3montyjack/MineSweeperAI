var gameState = require("./Winning.js");

var board = [];

//Returns the board in one array with the win and loss in other spaces in the Array
//[gameBoard, win, loss] and win and loss are booleans

export function clickSpace(x, y, gameBoard, flagging) {
  var win = false;
  var lose = false;
  board = gameBoard;
  var revealed0 = false;
  console.log("Flag State: ", flagging)
  if (board.get(x, y).getHidden()) {
    if (!flagging) {
      reveal(board, x, y);
      revealed0 = true;
      lose = gameState.lose(gameBoard);
      win = gameState.winning(gameBoard);
    } else {
      console.log("Flagging");
      board.get(x, y).setFlag(true);
    }
  }
  console.log("Win, Lose: " ,win, lose);
  return [board, win, lose, revealed0];
}

function reveal(board, x, y) {
  if (board.get(x, y).getHidden()) {
    board.get(x,y).reveal();
    if (board.get(x, y).getValue() === 0) {
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (
            i + x < board.getX() &&
            j + y < board.getY() &&
            i + x >= 0 &&
            j + y >= 0
          ) {
            if (board.get(x + i, y + j).getValue() === 0) {
              reveal(board, x + i, y + j);
            } else {
              board.get(x + i,y + j).reveal();
            }
          }
        }
      }
    } else {
      board.get(x,y).reveal();
    }
  }
  else {
    //Ending of recursion
  }
}
