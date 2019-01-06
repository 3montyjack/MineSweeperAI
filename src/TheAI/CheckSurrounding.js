import { getAiBoard } from "./TheAI.js";
import { location } from "./../Enums.js";

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

  var data = new dataSurrounding(x, y);
  for (var k = -1; k < 2; k++) {
    for (var l = -1; l < 2; l++) {
      if (!(l === 0 && k === 0)) {
        if (!checkIfOB(x, y, k, l)) {
          data.incrementWalls();
        } else {
          var checking = aiBoard[x + k][y + l];
          if (checking.getUnknown()) {
            data.incrementMissing();
          } else if (checking.getFlag()) {
            data.incrementBombsAround();
            // eslint-disable-next-line
          } else if (typeof checking.getValue() === "number") {
            data.incrementValue(checking.getValue());
          }
        }
      }
    }
  }
  return data;
}

function dataSurrounding(xT, yT) {
  var x = xT;
  var y = yT;
  var bombsAround = 0;
  var missing = 0;
  var walls = 0;
  var values = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  this.getX = function() {
    return x;
  };
  this.getY = function() {
    return y;
  };
  this.incrementBombsAround = function() {
    bombsAround++;
  };
  this.incrementMissing = function() {
    missing++;
  };
  this.incrementValue = function(value) {
    if (value >= 0 && value < 9) {
      values[value]++;
    } else {
      throw Error();
    }
  };
  this.incrementWalls = function() {
    walls++;
  };

  this.getBombsAround = function() {
    return bombsAround;
  };

  this.getWalls = function() {
    return walls;
  };

  this.getMissing = function() {
    return missing;
  };

  this.getValue = function(value) {
    if (value >= 0 && value < 9) {
      return values[value];
    }
    throw Error();
  };
}
