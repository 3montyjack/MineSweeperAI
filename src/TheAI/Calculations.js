import { checkIfOB, checkSurroundingCells } from "./CheckSurrounding.js";
import { init, location, states } from "./../Enums.js";
//Takes in current cords and the number on the current tile
export function findProbibilityClickingBomb(x, y, num) {
  if (typeof(num) === "number") {
    var surroundingData = checkSurroundingCells(x, y);
    var tempProbs =
      num /
      (parseFloat(surroundingData[location.missing]) -
        parseFloat(surroundingData[location.bombL]));
    console.log("Testing Probibility", x, y, num, tempProbs);
    return tempProbs;
  }

}
