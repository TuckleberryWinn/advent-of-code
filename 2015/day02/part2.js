const fs = require("fs");
let input = fs.readFileSync("input.txt").toString().trim().split("\n");

let neededRibbon = input.map((box) => {
  let [lengthX, lengthY, lengthZ] = box.split("x").map((val) => +val);

  let xWrap = lengthY + lengthZ;
  let yWrap = lengthX + lengthZ;
  let zWrap = lengthX + lengthY;

  let shortedWrap = Math.min(xWrap, yWrap, zWrap);

  let boxVolume = lengthX * lengthY * lengthZ;

  return shortedWrap * 2 + boxVolume;
});

let totalRibbon = neededRibbon.reduce((a, b) => a + b, 0);

console.log(totalRibbon);
