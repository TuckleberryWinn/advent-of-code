const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

let xCoord = 0;
let yCoord = 0;
let visitedHomes = {};

input.split("").forEach((instruction) => {
  visitedHomes[[xCoord, yCoord]] = true;
  if (instruction === "^") yCoord++;
  if (instruction === "v") yCoord--;
  if (instruction === ">") xCoord++;
  if (instruction === "<") xCoord--;
});

let totalHomesVisited = Object.keys(visitedHomes).length;

console.log(totalHomesVisited);
