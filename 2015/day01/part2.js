const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

let currentFloor = 0;
let instructionIndex = 0;

let result = input.split("").findIndex((currentInstruction) => {
  currentFloor += currentInstruction === "(" ? 1 : -1;
  instructionIndex++;
  return currentFloor < 0;
});

console.log(instructionIndex);
