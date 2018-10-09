import {
  bombShiftAll,
  clickTilesForObvious0,
  checkBombOverCount
} from "./ChangeDataInMap.js";
import { AICell } from "./Cell.js";
import { checkSurroundingCells } from "./CheckSurrounding.js";
import { clickSpace } from "./../GameLogic/GameClick.js";
import { init, states } from "./../Enums.js";
import { Table } from "./../GameLogic/GameBoard.js";
import { assignNumber } from "./../GameLogic/GenerateMap.js"; //TODO Remove this after done testing ai
import { findProbibilityClickingBomb } from "./Calculations.js";

var lose = false;
var win = false;

//Each Cell looks like
var actualBoard = [];
//Each Cell Looks like this [number,probibility, bomb, foundBombAround]
var aiBoard = [];

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

export function hardInitialize(gameBoardV) {
  //TODO Make a better way to pass variables between all of the other stuff
  console.log("ReInitalizing Map");
  actualBoard = gameBoardV;
  makeAIBoard();
  bombShiftAll();
}

function makeAIBoard() {
  aiBoard = JSON.parse(JSON.stringify(actualBoard.getBoard()));
  //Each Cell Looks like this [number,probibility, bomb, foundBombAround]
  for (var x = 0; x < aiBoard.length; x++) {
    for (var y = 0; y < aiBoard[x].length; y++) {
      if (actualBoard.get(x, y).getHidden()) {
        //Not Revealed
        aiBoard[x][y] = new AICell(x, y);
        if (actualBoard.get(x, y).getFlaged()) {
          aiBoard[x][y].setValue(states.flag);
          // console.log("Loading: ",x,y,states.flag)
        } else {
          // console.log ("Loading: ",x,y,states.undiscovered)
        }
      } else {
        //Revealed
        var temp = actualBoard.get(x, y).getValue();
        aiBoard[x][y] = new AICell(x, y);
        // console.log("Loading: ",x,y,temp)
        aiBoard[x][y].setValue(temp); //Plaving Value in aiBoardCell
      }
    }
  }
}

//New algorythim

function solve() {
  //clickOne till done
}

// Checks all the tiles for a tile with undiscovered tiles around
// that has its value-discoveredBombs = 0
//NOTE Finished And working I Think
function click0s() {
  var cords = clickTilesForObvious0();
  console.log("Clicking0's: ", cords);
  console.log(cords);
  if (cords[0] === init.termination) {
    return false;
  } else {
    console.log(Array.isArray(cords));
    clickCordsAI(cords, false);
    hardInitialize(actualBoard);
    //return [board, win, lose, revealed0];
    return true;
  }
}

function callClick(cords, flagging) {
  var temp = clickSpace(cords[0], cords[1], actualBoard, flagging);

  actualBoard = temp[0];
  win = temp[1];
  lose = temp[2];
  // revealed0 = temp[3]; //TODO Figure out if this is needed
}

function clickCordsAI(cords, flug) {
  var k = 0;
  while (cords[k] !== init.termination && k < 9) {
    console.log("(Flag/Click)ing: ", cords[k][0], cords[k][1]);
    callClick(cords[k], flug);
    k++;
  }
}

function biasedRandomClick() {
  //Check for tiles where you have the least ammount of chance of failure

  //TODO figure out this condition

  var currentProbs = 1;
  var list = [];
  for (var x = 0; x < aiBoard.length; x++) {
    for (var y = 0; y < aiBoard[x].length; y++) {
      //TODO Optimize this call
      var tempProbs = findProbibilityClickingBomb(
        x,
        y,
        aiBoard[x][y].getValue()
      );
      if (tempProbs !== null) {
        if (tempProbs === currentProbs) {
          list.push([x, y]);
        } else if (tempProbs < currentProbs) {
          list = [[x, y]];
          currentProbs = tempProbs;
        }
      }
    }
  }
  console.log(list);
  if (list.length > 0) {
    var randonInList = Math.floor(Math.random() * list.length);

    var cords = list[randonInList];

    

  } else {
    var mineY = Math.floor(Math.random() * aiBoard[0].length);
    var mineX = Math.floor(Math.random() * aiBoard.length);

    var failedTries = 0;

    while (!aiBoard[mineX][mineY].getUnknown() && failedTries < 10000) {
      mineY = Math.floor(Math.random() * aiBoard[0].length);
      mineX = Math.floor(Math.random() * aiBoard.length);
      failedTries++;
    }
    callClick([mineX, mineY], false);
  }

  // Check how many unclicked tiles there are arround
  // Check BombShefted ammount
  // Store array of lowest ods cords
  // if greater / less odds discovered then start new list with probibility
  // click random one from list

  console.log("Failed Tries: ", failedTries);
}

export function getAiBoard() {
  return aiBoard;
}

export function clickOne() {
  hardInitialize(actualBoard);
  //Make the gameboard into an ai readable borard
  //FigureOut if first click

  //check all tiles and bombshift all squares
  bombShiftAll();

  //Check for first if there is any 0s if there are click all of the tiles around the 0 that is undiscovered
  //Then check if there is any confirmable bombs
  //Else BiasedRandomly click a tile

  if (!click0s()) {
    console.log("Marking Bomb");
    var cords = checkBombOverCount();
    console.log("CheckingBombOver: ", cords);
    if (cords[0] === init.termination) {
      console.log("Making Biased Click");
      biasedRandomClick();
    } else {
      clickCordsAI(cords, true);
      hardInitialize(actualBoard);
    }
  } else {
    console.log("Clicked A 0");
  }
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
  //TODO renable win condition ?? Wait what does this mean
  temp[1] = win;
  temp[2] = lose;
  temp[3] = aiBoard;
  return temp;
}

// eslint-disable-next-line
export function displayAll(identifier, board) {
  console.log(identifier, board);
  // for (var i = 0; i < aiBoard.length; i++) {
  //   for (var j = 0; j < aiBoard[i].length; j++) {
  //     console.log(aiBoard[i][j].getDescription());
  //   }
  // }
  console.log(identifier, JSON.stringify(board));
}
