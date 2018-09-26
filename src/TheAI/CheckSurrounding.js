
var AI = require("./TheAI.js").constantMap;
var constants = AI

this.checkConfirmingBomb = function(x,y) {
  var data = checkSurroundingCells(x,y);
  //SUDO Code Temp
  // if (data[missing] == AI Map bombshifted) {
  //
  //   for(var value in square) {
  //     click on unexposed squares
  //  }
  //   startOver()
  // }
  //
};



this.checkSurroundingCells = function(x, y) {
  console.log(this.walls)

  //TODO Fix This Still
  var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
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

this.checkOneDiagonalyCorner = function (x, y, changeX, changeY) {

  //TODO Fix This Still
  if (checkIfOB(x, y, changeX, changeY)) {
    if (
      aiBoard[changeX + x][changeY + y][0] > 0 &&
      aiBoard[changeX + x][y][0] > 0 &&
      aiBoard[x][changeY + y][0] > 0
    ) {
      console.log("Checking Cells", changeX + x, changeY + y);

      if (this.checkSurroundingCells(changeX + x, changeY + y)[0] === 5) {
        console.log("Found Bomb: ", x, y);
        return true;
      }
    }
  }
  return false;
}

function checkIfOB(x, y, changeX, changeY) {
  //TODO Maybe some optimization
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
