import {bombShiftAll, clickTilesForObvious0 } from "./ChangeDataInMap.js"
import { Cell } from "./Cell.js";
import { checkSurroundingCells } from "./CheckSurrounding.js";
import { clickSpace } from "./../GameLogic/GameClick.js";
import { states } from "./../Enums.js";
import { foundBomb } from "./ChangeDataInMap.js"; //Temporary Import for testing

var click = require("./../GameLogic/GameClick.js");

var lose = false;
var win = false;


//Each Cell looks like
var actualBoard = [];
//Each Cell Looks like this [number,probibility, bomb, foundBombAround]
var aiBoard = [];

export function hardInitialize(gameBoardV) {
  //TODO Make a better way to pass variables between all of the other stuff
  console.log("ReInitalizing Map");
  actualBoard = gameBoardV;
  makeAIBoard();
}

function makeAIBoard() {
  aiBoard = JSON.parse(JSON.stringify(actualBoard));
  //Each Cell Looks like this [number,probibility, bomb, foundBombAround]
  aiBoard.forEach(function(childArray, x) {
    childArray.forEach(function(value, y) {
      if (!value[1]) {
        //Not Revealed
        aiBoard[x][y] = new Cell(x,y);
      } else {
        //Revealed
        var temp = aiBoard[x][y][0];
        aiBoard[x][y] = new Cell(x,y);
        aiBoard[x][y].setValue(temp) //Plaving Value in aiBoardCell
      }
    });
  });
}

//New algorythim

function solve() {
  //clickOne till done
}

function checkBombOverCount() {
  //This is going to check every tile to see if the number of unrevealed tiles is equal to the number bombShifted
  //If it is then it will return the location(s) of the bombShifted
  //Need to check to see if x and y are right
  aiBoard.forEach(function(data, x) {
    data.forEach(function(tile, y) {
      var cellsArround = checkSurroundingCells(y, x);
      if (cellsArround[states.bombL] === cellsArround[states.unknown]) {
        return x,y;
      }
    })
  })

}
// Checks all the tiles for a tile with undiscovered tiles around
// that has its value-discoveredBombs = 0
//NOTE Finished And working I Think
function click0s() {

  var cords = clickTilesForObvious0();
  if (cords === null) {
    return false;
  }
  console.log("Te He")
  var tempBoard = actualBoard;
  var k = 0;
  while (cords[k] !== null) {
    console.log(cords, tempBoard);
    var tempBoard = clickSpace(cords[k][0],cords[k][1], tempBoard, false)[0];
    k++;
  }
  hardInitialize(tempBoard);
  //return [board, win, lose, revealed0];
  return true;

}

function click0sAround() {
  //for each tile in the program go and click it if the bombshifted ammount is 0
}

function biasedRandomClick() {
  //Check for tiles where you have the least ammount of chance of failure
}

function markAroundAsBombs() {
  //Mark all of the undiscovered tiles around a tile as a bomb
}

/*Here is how the algorythim is going to work

Bombshift should be its own category where its a negative on itsself.
There should be the revealed number and then another category for the shifted ammount

Check if there are no clicked tiles
First click is random

Non first Click

1) First we go through and check if there are any bombs revealed
    Restoring the actual value and also the bomb shifted value on any of the tiles

2) Then we go through and see if there are any tiles that have 0 on them with the bomb shifted
    Then we go and click all the tiles around
    Go back to 1

3) If there are none then we go through and look for obvious bombs
  If the number of unclicked tiles around = bombshifted number click both / all
   If there are any go back to step 1

4) Randomly Guess on one of the revealed tiles

*/

export function getAiBoard() {
  return aiBoard;
}

export function clickOne() {
  //For testing Purposes we are going to override the input failedTries
  //Disabled Win condtition for this with Winning.js
  actualBoard = [[
    [0, false, states.notFlag],
    [1, false, states.notFlag],
    ["B", false, states.notFlag]],
    [[0, false, states.notFlag],
    [1, true, states.notFlag],
    [1, true, states.notFlag]],
    [[0, true, states.notFlag],
    [0, true, states.notFlag],
    [0, true, states.notFlag]]
  ];

  console.log(actualBoard)

  makeAIBoard(); //Make the gameboard into an ai readable borard
  //FigureOut if first click

  //check all tiles and bombshift all squares
  bombShiftAll();

  //Check for first if there is any 0s if there are click all of the tiles around the 0 that is undiscovered
  //Then check if there is any confirmable bombs
  //Else BiasedRandomly click a tile

  if (!click0s()) {
    if (checkBombOverCount()) {
      console.log("Marking Bomb")
      markAroundAsBombs();
    } else {
      console.log("Making Biased Click")
      biasedRandomClick();
    }
  } else {
    console.log("Clicked A 0")
  }
  console.log("Calling Found Bomb")

}

export function makeMove(tempBoard, aiBoardI, clicked) {

  if (aiBoardI === null || clicked) {
    hardInitialize(tempBoard);
  } else {
    aiBoard = aiBoardI;
    actualBoard = tempBoard;
  }

  clickOne();
  var temp = [];

  temp[0] = actualBoard;
  //TODO renable win condition
  temp[1] = win;
  temp[2] = lose;
  temp[3] = aiBoard;
  return temp;
}

export function displayAll(identifier,board) {
  console.log(identifier, board)
  board.forEach(function(row, i) {
    row.forEach(function(cell, j) {
      console.log(cell.getDescription())
    })
  })
}
