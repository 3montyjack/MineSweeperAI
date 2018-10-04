import { getAiBoard, displayAll } from "./TheAI.js";
import { checkIfOB, checkSurroundingCells } from "./CheckSurrounding.js";
import { states, location } from "./../Enums.js";

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
  displayAll("Should Have all of the bomb counts", aiBoard);
}

function clearOutBombCount() {
  //Go though all of the tiles and clear out the current bommb BombCount

  //need to figure out if row or column for each of these
  var aiBoard = getAiBoard();

  displayAll("Can have some Bomb Counts", aiBoard);
  for (var i = 0; i < aiBoard.length; i++) {
    for (var j = 0; j < aiBoard[i].length; j++) {
      //Need to pass constant for this form something
      //bombshifted is 12 right now
      aiBoard[i][j].emptyBombCount();
    }
  }
  displayAll("Should Be no Bomb Counts", aiBoard);
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
        aiBoard[x + i][y + j].incrementBombCount();
        console.log(aiBoard[x + i][y + j].getDescription());
      }
    }
  }
}

function clickSurrounding (x,y) {
  var aiBoard = getAiBoard();
  var clickCords = [null,null,null,null,null,null,null,null]
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (!(i === 0 && j === 0) && checkIfOB(x, y, i, j)) {
        if (aiBoard[x+i][y+j].getUnknown()) {
          var k = 0;
          while(clickCords[k] !== null) {
              k++;
          }
          clickCords[k] = [x+i,y+j];
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
      if (temp.getBombCount() === temp.getValue()) {
        var temp2 = checkSurroundingCells(i, j)[location.missing];
        console.log("Looking at: ", i, j, temp2)
        if (temp2 > 0) {
          console.log("Found Obvious: " + i + ", " + j);
          return clickSurrounding(i,j);
        }
      }
    }
  }
  return null;
}
