import { getAiBoard, displayAll } from "./TheAI.js";
import { checkIfOB, checkSurroundingCells } from "./CheckSurrounding.js";
import { init, location, states } from "./../Enums.js";

export function bombShiftAll() {
  var aiBoard = getAiBoard();
  //For each square in the map if there is a confirmed bomb then
  //Go through and clear out BombCount
  clearOutBombCount();
  //Start at 0,0 and if you hit somewhere that is confirmed to be a bomb, add one to bombCount arround
  //(checkBoundsOnArround)
  for (var i = 0; i < aiBoard.length; i++) {
    for (var j = 0; j < aiBoard[i].length; j++) {
      if (aiBoard[i][j].getFlag()) {
        incrementArround(i, j);
      }
    }
  }
}

export function checkBombOverCount() {
  //This is going to check every tile to see if the number of unrevealed tiles is equal to the number bombShifted
  //If it is then it will return the location(s) of the bombShifted
  //Need to check to see if x and y are right
  var aiBoard = getAiBoard();

  for (var x = 0; x < aiBoard.length; x++) {
    for (var y = 0; y < aiBoard[x].length; y++) {
      console.log("FindingBomb: ", x,y,aiBoard[x][y].getUnknown(), aiBoard[x][y].getFlag())
      if (!aiBoard[x][y].getUnknown() && !aiBoard[x][y].getFlag()) {
        var cellsArround = checkSurroundingCells(x, y);

        console.log(x,y, aiBoard[x][y].getUnknown(), aiBoard[x][y].getFlag(), cellsArround)
        var totalUnsure = cellsArround[location.bombL] + cellsArround[location.missing];
        var matching = cellsArround[location.bombL] === cellsArround[location.missing];
        if ((cellsArround[location.missing] > 0) && totalUnsure !== 0 && aiBoard[x][y].getValue() === totalUnsure - cellsArround[location.walls]
        ) {

          return clickSurrounding (x,y);
        }
      }
    }
  };
  return clickSurrounding(-1,0);
}

function clearOutBombCount() {
  //Go though all of the tiles and clear out the current bommb BombCount

  //need to figure out if row or column for each of these
  var aiBoard = getAiBoard();
  for (var i = 0; i < aiBoard.length; i++) {
    for (var j = 0; j < aiBoard[i].length; j++) {
      //Need to pass constant for this form something
      //bombshifted is 12 right now
      aiBoard[i][j].emptyBombCount();
    }
  }
}



//TODO Change this to be local after implementing
export function foundBomb(x, y) {
  //Temporary Export Remove later
  //Ignoring X and Y
  //For the 8 tiles around the bomb bombshift all of the values down
  console.log("Found A Bomb");
  var aiBoard = getAiBoard();

  aiBoard[x][y].setFlag();
  incrementArround(x, y);
}

function incrementArround(x, y) {
  var aiBoard = getAiBoard();

  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && checkIfOB(x, y, i, j)) {
        console.log("Incrrementing BombCount: ",x + i, y + j, aiBoard[x + i][y + j].getDescription());
        aiBoard[x + i][y + j].incrementBombCount();
      }
    }
  }
}

function clickSurrounding (x,y) {
  var aiBoard = getAiBoard();
  var clickCords = [init.termination]
  var currentIndex = 0;
  if (x === -1) {
    return clickCords;
  }
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && checkIfOB(x, y, i, j)) {
        if (aiBoard[x+i][y+j].getUnknown()) {

          clickCords[currentIndex] = [x+i,y+j];
          clickCords[++currentIndex] = init.termination
        }
      }
    }
  }
  return clickCords;
}

export function clickTilesForObvious0() {
  var aiBoard = getAiBoard();
  for (var i = 0; i < aiBoard.length; i++) {
    for (var j = 0; j < aiBoard[i].length; j++) {
      var temp = aiBoard[i][j];
      // console.log("Obvo's: ", i,j, temp.getDescription())
      if (temp.getBombCount() === temp.getValue()) {
        var temp2 = checkSurroundingCells(i, j)[location.missing];
        if (temp2 > 0) {
          console.log("Found Obvious: " + i + ", " + j);
          return clickSurrounding(i,j);
        }
      }
    }
  }
  return clickSurrounding(-1,0); //Returning an empty array
}
