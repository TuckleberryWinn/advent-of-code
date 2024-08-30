const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

let totalChars = 0;
let totalPlusEncoded = 0;
let previousSlashCount = 0;
const escapeChars = ['"', "\\", "x"];

for (const line of input) {
  // take in current line length and add it to total count
  let currentLineLength = line.length;
  totalChars += line.length;

  // add escape characters to preserve slashes and quotes in text file
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "\\" || line[i] === '"') {
      currentLineLength++;
    }
  }

  // account for new quotes around strings
  currentLineLength += 2;
  totalPlusEncoded += currentLineLength;
}

console.log(
  `New encoded total(${totalPlusEncoded}) - total start chars(${totalChars}) = ${
    totalPlusEncoded - totalChars
  }`
);
