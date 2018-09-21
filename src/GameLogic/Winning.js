this.winning = function(gameBoard) {
  if (gameBoard != null) {
    for (var i = 0; i < gameBoard.length; i++) {
      for (var j = 0; j < gameBoard[0].length; j++) {
        if (gameBoard[i][j][0] !== "B" && !gameBoard[i][j][1]) {
          return false;
        } else if (gameBoard[i][j][0] === "B" && gameBoard[i][j][1]) {
          return false;
        }

      }
    }
    return true;
  }
}

this.lose = function(gameBoard) {
  for (var i = 0; i < gameBoard.length; i++) {
    for (var j = 0; j < gameBoard[0].length; j++) {
      if (gameBoard[i][j][0] === "B" && gameBoard[i][j][1]) {
        return true;
      }

    }
  }
  return false;

}
