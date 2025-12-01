const fs = require("fs");
let input = fs.readFileSync("input1.txt").toString();


let instructions = input.split('\r\n')

let position = 50
let zeroCount = 0
for (const line of instructions) {
    const dir = line[0]
    const mag = Number(line.slice(1))
    
    if (dir == 'L') {
        position += mag
    } else {
        position -= mag
    }
    
    if (position % 100 == 0) {
        zeroCount++
    }
}

console.log(zeroCount);
