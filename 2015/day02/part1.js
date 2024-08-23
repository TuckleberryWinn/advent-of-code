const fs = require("fs");
let input = fs.readFileSync("input.txt").toString().trim().split("\n");

let neededArea = input.map((box) => {
  let [lengthX, lengthY, lengthZ] = box.split("x").map((val) => +val);

  let x = lengthX * lengthY;
  let y = lengthY * lengthZ;
  let z = lengthZ * lengthX;

  let slack_side = Math.min(x, y, z);

  return 2 * (x + y + z) + slack_side;
});

let totalPaperOrder = neededArea.reduce((a, b) => a + b, 0);

console.log(totalPaperOrder);
