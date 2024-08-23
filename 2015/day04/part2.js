const fs = require("fs");
const crypto = require("crypto");
let input = fs.readFileSync("input.txt").toString();

let hash;
let stringKey;

let i = -1;

do {
  i++;
  stringKey = `${input}${i}`;
  hash = crypto.createHash("md5").update(stringKey).digest("hex");
} while (hash.substring(0, 6) !== "000000");

console.log(stringKey);
