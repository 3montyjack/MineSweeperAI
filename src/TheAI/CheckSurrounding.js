import {
  getAiBoard
} from "./TheAI.js";
import {
  location,
  states
} from "./../Enums.js";


function checkConfirmingBomb(x, y) {
  var data = checkSurroundingCells(x, y);
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

export function checkIfOB(x, y, changeX, changeY) {
  //TODO Maybe some optimization

  var aiBoard = getAiBoard();

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

export function checkSurroundingCells(x, y) {
  var aiBoard = getAiBoard();
  //TODO Fix This Still
  var data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (var k = -1; k < 2; k++) {
    for (var l = -1; l < 2; l++) {

      if (!(l === 0 && k === 0)) {
        if (!checkIfOB(x, y, k, l)) {
          data[location.walls]++;
        } else {
          var checking = aiBoard[x + k][y + l];
          if (checking.getUnknown()) {
            data[location.missing]++;
          } else if (checking.getFlag()) {
            data[location.bombL]++;
            // eslint-disable-next-line
          } else if (typeof(checking.getValue()) === "number") {
            data[checking.getValue()]++;
          }
        }
      }
    }
  }
  console.log(data)
  return data;
};

function checkOneDiagonalyCorner(x, y, changeX, changeY) {
  var aiBoard = getAiBoard();
  //TODO Fix This Still
  if (checkIfOB(x, y, changeX, changeY)) {
    if (
      aiBoard[changeX + x][changeY + y].getValue() > 0 &&
      aiBoard[changeX + x][y].getValue() > 0 &&
      aiBoard[x][changeY + y].getValue() > 0
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
