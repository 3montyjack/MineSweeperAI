import { checkIfOB, checkSurroundingCells } from "./CheckSurrounding.js";
import { init, location, states } from "./../Enums.js";
//Takes in current cords and the number on the current tile
export function findProbibilityClickingBomb(x, y, num) {
  if (typeof num === "number" && num !== 0) {
    var surroundingData = checkSurroundingCells(x, y);
    console.log(
      num,

    );
    var numerator = num - parseFloat(surroundingData.getBombsAround())
    var denominator = parseFloat(surroundingData.getWalls()) -
      parseFloat(surroundingData.getBombsAround())
    console.log(numerator)
    var tempProbs =
      (numerator)/
      (denominator);
    console.log("Testing Probibility", x, y, num, tempProbs);
    return tempProbs;
  }
}
