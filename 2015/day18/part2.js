const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

const NUMBER_OF_GENERATIONS = 100;

//create 2D array of lights
let lightGrid = Array(100)
  .fill()
  .map((rows) => Array(100).fill(false));

//part 2 --> fix corners
lightGrid[0][0] = true;
lightGrid[0][99] = true;
lightGrid[99][0] = true;
lightGrid[99][99] = true;

//Go through input and turn on lights
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (input[i][j] === "#") {
      lightGrid[i][j] = true;
    }
  }
}

//Perform generations of game

for (let i = 0; i < NUMBER_OF_GENERATIONS; i++) {
  let nextGrid = Array(100)
    .fill()
    .map((rows) => Array(100).fill(false));

  for (let j = 0; j < lightGrid.length; j++) {
    for (let k = 0; k < lightGrid.length; k++) {
      nextGrid[j][k] = checkNeighbors(j, k);
    }
  }
  //part 2 - fix corner lights
  nextGrid[0][0] = true;
  nextGrid[0][99] = true;
  nextGrid[99][0] = true;
  nextGrid[99][99] = true;

  lightGrid = nextGrid;
}

function checkNeighbors(x, y) {
  let adjacentLights = [
    [x, y - 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
    [x, y + 1],
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
  ];

  let neighborCount = 0;
  for (let i = 0; i < adjacentLights.length; i++) {
    if (
      adjacentLights[i][0] < 0 ||
      adjacentLights[i][0] > 99 ||
      adjacentLights[i][1] < 0 ||
      adjacentLights[i][1] > 99
    ) {
      continue;
    }
    if (lightGrid[adjacentLights[i][0]][adjacentLights[i][1]]) {
      neighborCount += 1;
    }
  }
  //set value based on neighbor count
  if (neighborCount === 3) {
    return true;
  } else if (neighborCount === 2 && lightGrid[x][y]) {
    return true;
  } else {
    return false;
  }
}

//count remaining lights on
let endLightCount = 0;
for (let i = 0; i < lightGrid.length; i++) {
  for (let j = 0; j < lightGrid.length; j++) {
    if (lightGrid[i][j]) {
      endLightCount += 1;
    }
  }
}

console.log(endLightCount);
