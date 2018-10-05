import { init, states } from "./../Enums.js";

export function Table(xT,yT, bCount) {
  var x = xT;
  var y = yT;
  var data = [];
  var inverted = [];
  var bombCount = bCount;

  this.populateTable = function() {
    data = new Array(x);
    for (var i = 0; i < x; i++) {
      var temp = new Array(y)
      for (var j = 0; j < y; j++) {
        temp[j] = new cell(i,j);
      }
      data[i] = temp;
    }
    inverted = new Array(y);
    for (var k = 0; k < y; k++) {
      inverted[k] = new Array(x)
    }

    for (var l = 0; l < y; l++) {
      for (var m = 0; m < x; m++) {
        inverted[l][m] = data[m][l];
      }
    }
  }

  this.getBombCount = function() {
    return bombCount;
  }

  this.get = function(x,y) {
    return data[x][y];
  }

  this.getY = function() {
    return y;
  }

  this.getX = function() {
    return x;
  }

  this.getBoard = function() {
    return data;
  }

  this.getDisplayBoard = function() {
    return inverted;
  }
}

function cell(xT, yT) {
  var x = xT;
  var y = yT;
  var value = init.emptyInit;
  var revealed = init.initRevealed;
  var flaged = init.initFlag;

  this.getFlaged = function() {
    return flaged;
  }

  this.getRevealed = function() {
    return revealed;
  }

  this.getHidden = function() {
    return !revealed;
  }

  this.getValue = function() {
    return value;
  }

  this.getBomb = function() {
    return (value === states.bomb);
  }

  this.getY = function() {
    return y;
  };

  this.getX = function() {
    return x;
  };

  this.getDescription = function() {
    return ("Cell: " + x + ", " + y + ": " + value + ", " + revealed + ", " + flaged);
  }

  this.reveal = function() {
    revealed = true;
  }

  this.setBomb = function() {
    value = states.bomb;
  }
  this.setValue = function(valueT) {
    value = valueT;
  }
  this.setFlag = function(valueT) {
    flaged = valueT;
  }

}
