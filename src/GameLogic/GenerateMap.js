import { Table } from "./GameBoard.js";
import { init } from "./../Enums.js";
//2D Array with all of the data in each y,x being [Type,Revealed]
//E is empty
//F is flag
//B is bomb
//[] is a number and that is how many arround is a mine

export function getMap(sizeX, sizeY, numberM) {

  //The code Flips the values for the actual size
  var map = new Table(sizeX,sizeY, numberM);
  map.populateTable();
  addMines(map, numberM);
  assignNumber(map)
  return map;
}

function addMines(table, numberM) {

  var failedTries = 0;
  var numberTemp = numberM;

  while(numberTemp > 0) {

    var mineY = Math.floor(Math.random() * table.getY());
    var mineX = Math.floor(Math.random() * table.getX());

    if (table.get(mineX,mineY).getValue() === init.emptyInit) {
      table.get(mineX,mineY).setBomb();
      numberTemp = numberTemp-1;
    } else {
      failedTries++;
    }
  }
  console.log('FailedTries: ', failedTries);
}

export function assignNumber(table) { //TODO remove the export on this when done testing
  var sizeY = table.getY();
  var sizeX = table.getX();
  for (var x = 0; x < sizeX; x++) {
    for (var y = 0; y < sizeY; y++) {
      if (!table.get(x,y).getBomb()) {
        var temp = checkSurroundingCells(table,x,y,sizeY,sizeX);
        table.get(x,y).setValue(temp)
      }
    }
  }
}

function checkSurroundingCells(table,x,y,sizeY,sizeX) {
  var number = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (i+x < sizeX
          && j+y < sizeY
          && i+x >= 0
          && j+y >= 0) {
        if (table.get(x+i,y+j).getBomb() && !(i === 0 && j === 0)) {
          number++;
        }
      }
    }
  }
  return(number);
}
