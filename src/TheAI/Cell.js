import { states } from "./../Enums.js";

export function Cell(xT,yT) {
  var value = states.undiscovered;
  var x = xT;
  var y = yT;
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
  this.setX = function(value) {
    x = value
  };
  this.setY = function(value) {
    y = value
  };
  this.setFlag = function() {
    value = states.flag;
  };
  this.setBomb = function() {
    value = states.flag;
  };
  this.setWalls = function(valueT) {
    walls = valueT
  };
  this.setValue = function(valueT) {
    value = valueT
  };
  this.getValue = function() {
    return value;
  }
  this.getBomb = function () {
    return (value === states.bomb)
  }
  this.getFlag = function () {
    return (value === states.flag)
  }
  this.getBombCount = function() {
    return bombshifted;
  }
  this.getUnknown = function() {
    return (value === states.undiscovered)
  }
  this.getDescription = function() {
    return ("Cell: "+x+", "+y+"; "+value+", "+bombshifted)
  }
}
