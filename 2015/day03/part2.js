const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

let xCoordSanta = 0;
let yCoordSanta = 0;

let xCoordRoboSanta = 0;
let yCoordRoboSanta = 0;

let visitedHomes = {};

let isSantasTurn = true;

input.split("").forEach((instruction) => {
  visitedHomes[[xCoordSanta, yCoordSanta]] = true;
  visitedHomes[[xCoordRoboSanta, yCoordRoboSanta]] = true;

  if (isSantasTurn) {
    if (instruction === "^") yCoordSanta++;
    if (instruction === "v") yCoordSanta--;
    if (instruction === ">") xCoordSanta++;
    if (instruction === "<") xCoordSanta--;
  } else {
    if (instruction === "^") yCoordRoboSanta++;
    if (instruction === "v") yCoordRoboSanta--;
    if (instruction === ">") xCoordRoboSanta++;
    if (instruction === "<") xCoordRoboSanta--;
  }
  isSantasTurn = !isSantasTurn;
});

let totalHomesVisited = Object.keys(visitedHomes).length;

console.log(totalHomesVisited);
