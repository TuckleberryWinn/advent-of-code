const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

input = Array.from(input).map(x => Number(x))

let sum = 0
for (const x in input) {
    const nextIndex = (Number(x) + 1) % input.length
    if (input[x] == input[nextIndex]) {
        sum += input[x]
    }
}

console.log(input, sum);
