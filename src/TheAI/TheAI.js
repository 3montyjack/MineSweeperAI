var click = require("./../GameLogic/GameClick.js");
var surround = require("./CheckSurrounding.js")

//Each Cell Looks like this [number,probibility, bomb, foundBombAround]
var aiBoard = [];

const probibility = -1;
const figuredOut = -2;
const unknown = "U";
const bomb = true;
const nearbyBombs = 0;

//Each Cell looks like
var actualBoard = [];
var numberOfBombs = 0;
var foundBomb = false;

var walls = 9;
var missing = 10;
var bombL = 11;

this.initialize = function(gameBoardV, numberOfBombs) {
  actualBoard = gameBoardV;
  makeAIBoard();
};

function makeAIBoard() {
  aiBoard = JSON.parse(JSON.stringify(actualBoard));

  //For slowing down the ai at a later time if needed
  // setTimeout(function() {
  // }, 500);

  aiBoard.forEach(function(childArray, x) {
    childArray.forEach(function(value, y) {
      if (!aiBoard[x][y][1]) {
        aiBoard[x][y] = [unknown, probibility, !bomb, nearbyBombs];
      } else {
        aiBoard[x][y] = [aiBoard[x][y][0], figuredOut, aiBoard];
      }
    });
  });
}

function firstMove() {
  console.log("First Move");
}

this.makeMove = function(tempBoard, aiBoardI, clicked) {
  if (aiBoardI === null || clicked) {
    this.initialize(tempBoard);
  } else {
    aiBoard = aiBoardI;
    actualBoard = tempBoard;
  }

  foundBomb = false;

  var finished = [];
  var easyMode = makeEasyMove();
  var cords = easyMode[1];
  var sendClick = easyMode[0];

  if (foundBomb) {
    temp = this.makeMove(actualBoard, aiBoard, false);

  } else if (!easyMode[0]) {

    cords = makeProbibilityMove();
    sendClick = true;
  }
  if (sendClick) {
    var temp = click.clickSpace(cords[1], cords[0], actualBoard, false);
  }
  if (!temp[1] && !temp[2]) {
    actualBoard = temp[0];
    if (temp[3]) {
      console.log("ReInitalizing Map")
      this.initialize(temp[0]);
    } else {
      aiBoard[cords[0]][cords[1]][0] = temp[0][cords[0]][cords[1]][0];
    }
  }
  //Append to the back of the temp data the ai board so we dont have to redo all of the calculations
  temp[3] = aiBoard;
  console.log(aiBoard);
  return temp;
};

//Returns True or false depending on weather or not there is an easy(0% chance of losing) move
//Also returns the cordinance of where the move should be
//X,Y is assuming that x is the outer array and Y is the inner array
//[easyMoveCondition,x,y]

function makeEasyMove() {
  console.log("Hit Here");

  //Check for surrounded by ones or greater
  var easyMoveFlag = false;
  for (var i = 0; i < aiBoard.length; i++) {
    for (var j = 0; j < aiBoard[0].length; j++) {
      var data = [];
      //Check the 8 surrounding Tiles
      if (aiBoard[i][j][0] === unknown) {
        data = surround.checkSurroundingCells(i, j);
        console.log(data, i, j)
        console.log(aiBoard)
        if (data[0] > 0) {
          easyMoveFlag = true;
        } else {
          // Check For bomb in a tile
          if (confirmBombInTile(i, j)) {

          }
        }
        if (easyMoveFlag === true) {
          return [true, [i, j]];
        }
      }
    }
  }
  return easyMoveFlag;
}


//// NOTE: HardMoves

function addOneToBombsAround(x, y) {
  for (var k = -1; k < 2; k++) {
    for (var l = -1; l < 2; l++) {
      if (
        k + x < aiBoard.length &&
        l + y < aiBoard[0].length &&
        k + x >= 0 &&
        l + y >= 0
      ) {
        if (!(l === 0 && k === 0)) {
          aiBoard[k+x][y+l][3]++;
        }
      }
    }
  }
}
//Check each of the diagonals for a 1 that is surrounded by all 0's
//Arguments x,y of the checked tile and boolean of weather its in positive x or pos y
//True is positive false is not


function confirmBombInTile(x, y) {
  //var data = surround.checkSurroundingCells(x, y);
  flag = true;
  if (!aiBoard[x][y][2]) {
    for (var Dx = -1; Dx <= 1; Dx++) {
      for (var Dy = 1; Dy <= 1; Dy++) {
          if (!surround.checkOneDiagonalyCorner(x, y, Dx, Dy)) {
            flag = false;
          }
      }
    }
    if (flag) {
      console.log("Found Bomb");
      foundBomb = true;
      aiBoard[x][y][2] = true;
      addOneToBombsAround(x, y);

      return true;
    }
  }
  return false;
}

function makeProbibilityMove() {
  var x = 0;
  var y = 0;
  console.log("Making Fake Harder Move")
  return [x, y];
}
