import { states } from "./../Enums.js";

export function AICell(xT, yT) {
  var x = xT;
  var y = yT;
  var value = states.undiscovered;
  var bombshifted = 0;
  var walls = null;


  this.incrementBombCount = function() {
    bombshifted++;
  };

  this.setBombCount = function(value) {
    bombshifted = value;
  };

  this.emptyBombCount = function() {
    bombshifted = 0;
  };

  this.setFlag = function() {
    value = states.flag;
  };
  //This is not goinh to be used, use setFlag
  // this.setBomb = function() {
  //   value = states.flag;
  // };

  this.setWalls = function(valueT) {
    walls = valueT;
  };

  this.setValue = function(valueT) {
    value = valueT;
  };

  this.getY = function() {
    return y;
  };

  this.getX = function() {
    return x;
  };

  this.getValue = function() {
    return value;
  };

  this.getBomb = function() {
    return value === states.bomb;
  };

  this.getFlag = function() {
    return value === states.flag;
  };

  this.getBombCount = function() {
    return bombshifted;
  };

  this.getUnknown = function() {
    return value === states.undiscovered;
  };

  this.getWalls = function(valueT) {
    return walls;
  };

  this.getDescription = function() {
    return "Cell: " + x + ", " + y + "; " + value + ", " + bombshifted;
  };

}
