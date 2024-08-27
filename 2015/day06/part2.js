const fs = require("fs");
let input = fs.readFileSync("input.txt").toString().trim().split("\n");

// Clean the input to be mapped as actions + coordinates
let cleanInput = input.map((instruction) => {
  let [_, action, startX, startY, endX, endY] =
    /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)/.exec(
      instruction
    );
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
  .map((rows) => Array(1000).fill(0));

//follow instructions from input
cleanInput.forEach((instructions) => {
  let [start, end] = instructions.coords;
  for (let i = start[0]; i <= end[0]; i++) {
    for (let j = start[1]; j <= end[1]; j++) {
      if (instructions.action === "toggle") {
        lightGrid[i][j] += 2;
      } else if (instructions.action === "turn on") {
        lightGrid[i][j] += 1;
      } else if (instructions.action === "turn off") {
        lightGrid[i][j] -= 1;
      } else {
        console.log("Instruction not interpreted: ", instructions.action);
      }
      //prevent weird negative values
      if (lightGrid[i][j] < 0) {
        lightGrid[i][j] = 0;
      }
    }
  }
});

//count the total brightness of all lights
let lightBrightness = 0;
for (let i = 0; i < lightGrid.length; i++) {
  for (let j = 0; j < lightGrid[0].length; j++) {
    lightBrightness += lightGrid[i][j];
  }
}

console.log(`Total light brightness: ${lightBrightness}`);
