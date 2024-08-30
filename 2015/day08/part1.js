const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

let totalChars = 0;
let charsInMemory = 0;
let previousSlashCount = 0;

for (const line of input) {
  // take in current line length and add it to total count
  let currentLineLength = line.length;
  totalChars += line.length;

  // start trimming currentLineLength to leave only characters in memory
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "\\") {
      //check to ensure this is an escape character
      previousSlashCount = 0;
      const slashChecker = checkForPreviousSlash(line, i - 1);
      if (previousSlashCount % 2 == 1) {
        continue;
      }

      // \" or \\ is minus 1 character
      if (line[i + 1] === '"' || line[i + 1] === "\\") {
        currentLineLength -= 1;
      }
      // \x is minus 3 characters
      else if (line[i + 1] === "x") {
        currentLineLength -= 3;
      }
    }
  }

  //removes quotes around each line
  currentLineLength -= 2;
  charsInMemory += currentLineLength;
}

// this is the recursive check we use to ensure we're only tracking quotes that aren't already part of an escape
function checkForPreviousSlash(string, index) {
  if (string[index] === "\\") {
    previousSlashCount++;
    checkForPreviousSlash(string, index - 1);
  } else {
    return previousSlashCount;
  }
}

console.log(
  `total chars(${totalChars}) - chars in memory(${charsInMemory}) = ${
    totalChars - charsInMemory
  }`
);
