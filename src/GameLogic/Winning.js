this.winning = function(gameBoard) {
  for (var i = 0; i < gameBoard.getX(); i++) {
    for (var j = 0; j < gameBoard.getY(); j++) {
      //TODO Clean up this if conditional
      if (!gameBoard.get(i, j).getBomb() && gameBoard.get(i, j).getHidden()) {
        return false;
      } else if (
        !gameBoard.get(i, j).getBomb() &&
        gameBoard.get(i, j).getHidden()
      ) {
        return false;
      }
    }
  }
  //TODO ReEnable Win condition switch to true
  return true;
};

this.lose = function(gameBoard) {
  for (var i = 0; i < gameBoard.getX(); i++) {
    for (var j = 0; j < gameBoard.getY(); j++) {
      if (
        gameBoard.get(i, j).getBomb() &&
        gameBoard.get(i, j).getRevealed()
      ) {
        return true;
      }
    }
  }
  return false;
};
