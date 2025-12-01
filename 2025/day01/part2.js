const fs = require("fs");
let input = fs.readFileSync("input1.txt").toString();

let instructions = input.split('\r\n')

let position = 50
let zeroCount = 0
for (const line of instructions) {
    const dir = line[0]
    const mag = Number(line.slice(1))

    if (dir == 'R') {
      if (position == 100) position = 0;
      position += mag;
    } else {
      if (position == 0) position = 100;
      position -= mag
    }
      
    while (position > 100) {
      position -= 100
      zeroCount++
    }
    
    while (position < 0) {
      position += 100
      zeroCount++
    }
    
    if (position == 0 || position == 100) {
      zeroCount++
    }
}

console.log(zeroCount);