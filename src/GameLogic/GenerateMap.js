
//2D Array with all of the data in each y,x being [Type,Revealed]
//E is empty
//F is flag
//B is bomb
//[] is a number and that is how many arround is a mine
var data = []
var bomb = "B"
var flag = "F"
var notFlag = "G"

this.getMap = function(sizeX, sizeY, numberM) {

  //The code Flips the values for the actual size
  map(sizeY, sizeX, numberM)
  return data;
}

function map(sizeY, sizeX, numberM) {

  data = new Array(sizeY);
  for (var n = 0; n < sizeY; n++) {
    data[n] = new Array(sizeX);
  }

  for (var i = 0; i < sizeY; i++) {
    for (var j = 0; j < sizeX; j++) {
      data[i][j] = ["E",false,notFlag]
    }
  }

  //Add Mines
  addMines(sizeY, sizeX, numberM);
  assignNumber(sizeY, sizeX);

}

function addMines(sizeY, sizeX, numberM) {

  var failedTries = 0;
  var numberTemp = numberM;

  while(numberTemp > 0) {

    var mineY = Math.floor(Math.random() * sizeY);
    var mineX = Math.floor(Math.random() * sizeX);

    if (data[mineY][mineX][0] ==="E") {
      data[mineY][mineX][0] = bomb;
      numberTemp = numberTemp-1;
    } else {
      failedTries++;
    }
  }
  console.log('FailedTries: ', failedTries);
}

function assignNumber(sizeY, sizeX) {
  for (var i = 0; i < sizeY; i++) {
    for (var j = 0; j < sizeX; j++) {
      if (data[i][j][0] !== bomb) {
        data[i][j][0] = checkSurroundingCells(i,j,sizeY,sizeX)
      }
    }
  }
}

function checkSurroundingCells(y,x,sizeY,sizeX) {
  var number = 0;
  for (var i = -1; i < 2; i++) {
    for (var j = -1; j < 2; j++) {
      if (i+y < sizeY
          && j+x < sizeX
          && i+y >= 0
          && j+x >= 0) {
        if (data[y+i][x+j][0] === bomb && !(i === 0 && j === 0)) {
          number++;
        }
      }
    }
  }
  return(number);
}
