function constants() {


  this.init = function() {

  };


};

//Defining Constants for the AI

constants.aiBoard = [];

constants.probibility = -1;

constants.figuredOut = -2;

constants.unknown = "U";

constants.getUnknown = function() {
  return constants.unknown;
}

constants.bomb = true;

constants.getBombValue = function() {
  return constants.bomb;
}


//Each Cell looks like
constants.actualBoard = [];

constants.numberOfBombs = 0;

this.incrementBombs = function() {
  return constants.numberOfBombs;
};


constants.foundBomb = false;

constants.wall = 9;

constants.getWallID = function() {
  return constants.wall;
}


constants.missing = 10;
constants.bombL = 11;

module.exports = {
  constants
}
