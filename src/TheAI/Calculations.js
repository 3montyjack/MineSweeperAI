


function findProbiblity(x, y) {
  var board = [];
  var tempProbs = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (
        i + x < board.length &&
        j + y < board[0].length &&
        i + x >= 0 &&
        j + y >= 0
      ) {
        if (board[x + i][y + j][0] === 0) {
          board[x][y][1] = true;
        } else {
          board[x + i][y + j][1] = true;
        }
      }
    }
  }
  return tempProbs;
}
