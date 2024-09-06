const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("");

const asciiOffsetValue = 97;
const testRuleOne =
  /abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/;
const testRuleTwo = /[iol]/;
const testRuleThree = /(.)\1.*?(.)\2/;

do {
  incrementInput(1);
} while (passSecurityTest());

function incrementInput(position) {
  let holder = getCharIndex(input[input.length - position]);
  if (holder == 25) {
    rolloverCharacter(position);
  } else {
    holder += 1;
    input[input.length - position] = indexToChar(holder);
  }
}

function rolloverCharacter(position) {
  input[input.length - position] = "a";
  incrementInput(position + 1);
}

function getCharIndex(char) {
  return char.charCodeAt() - asciiOffsetValue;
}

function indexToChar(index) {
  return String.fromCharCode(index + asciiOffsetValue);
}

function passSecurityTest() {
  let testCase = input.join("");
  //  console.log(testCase);
  if (
    !testRuleOne.test(testCase) ||
    testRuleTwo.test(testCase) ||
    !testRuleThree.test(testCase)
  ) {
    return true;
  } else {
    return false;
  }
}

// return character array to string
input = input.join("");
console.log(input);
