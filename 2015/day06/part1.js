const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\n");

// Clean the input to be mapped as actions + coordinates
let cleanInput = input.map((instruction) => {
  var execResult =
    /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/.exec(
      instruction
    );
  console.log(`What is execResult?`, execResult);
  let [_, action, startX, startY, endX, endY] = execResult;
  [startX, startY, endX, endY] = [startX, startY, endX, endY].map(Number);
  //  console.log(action, startX, startY, endX, endY);
  return {
    action,
    coords: [
      [startX, startY],
      [endX, endY],
    ],
  };
});

//create 2D array to map instructions to
let lightGrid = Array(1000)
  .fill()
  .map((rows) => Array(1000).fill(false));

//follow instructions from input
cleanInput.forEach((instructions) => {
  let [start, end] = instructions.coords;
  for (let i = start[0]; i <= end[0]; i++) {
    for (let j = start[1]; j <= end[1]; j++) {
      if (instructions.action === "toggle") {
        lightGrid[i][j] = !lightGrid[i][j];
      } else if (instructions.action === "turn on") {
        lightGrid[i][j] = true;
      } else if (instructions.action === "turn off") {
        lightGrid[i][j] = false;
      } else {
        console.log("Instruction not interpreted: ", instructions.action);
      }
    }
  }
});

//count the lights on at the end of instructions
let lightCount = 0;
for (let i = 0; i < lightGrid.length; i++) {
  for (let j = 0; j < lightGrid[0].length; j++) {
    if (lightGrid[i][j] === true) {
      lightCount++;
    }
  }
}

console.log(`Total light count: ${lightCount}`);
