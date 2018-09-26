this.checkForKnownBombsAround = function() {};

this.checkSurroundingCells = function(x, y) {
  var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (var k = -1; k < 2; k++) {
    for (var l = -1; l < 2; l++) {
      if (checkIfOB(x, y, k, l)) {
        console.log("Checking ", x + k, y + l, aiBoard[x + k][y + l][0]);
        if (!(l === 0 && k === 0)) {
          var checking = aiBoard[x + k][y + l][0];
          if (checking === unknown) {
            if (aiBoard[x + k][y + l][2]) {
              data[bombL]++;
            } else {
              data[missing]++;
            }
          } else {
            console.log("Loading To Data", checking);
            var location = checking;
            data[location] = data[location] + 1;
          }
        }
      } else {
        data[walls]++;
      }
    }
  }
  return data;
};

function checkOneDiagonalyCorner(x, y, changeX, changeY) {
  if (checkIfOB(x, y, changeX, changeY)) {
    if (
      aiBoard[changeX + x][changeY + y][0] > 0 &&
      aiBoard[changeX + x][y][0] > 0 &&
      aiBoard[x][changeY + y][0] > 0
    ) {
      console.log("Checking Cells", changeX + x, changeY + y);

      if (surround.checkSurroundingCells(changeX + x, changeY + y)[0] === 5) {
        console.log("Found Bomb: ", x, y);
        return true;
      }
    }
  }
  return false;
}

function checkIfOB(x, y, changeX, changeY) {
  if (
    changeX + x < aiBoard.length &&
    changeY + y < aiBoard[0].length &&
    changeX + x >= 0 &&
    changeY + y >= 0
  ) {
    return true;
  }
  return false;
}
