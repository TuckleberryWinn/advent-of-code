const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

const ranges = input.split(',')

let sum = 0
for (const range of ranges) {
    const ends = range.split('-')

    for (let x = Number(ends[0]); x <= Number(ends[1]); x++) {
        if (String(x).length % 2 == 0){
            if (String(x).slice(0, (String(x).length / 2)) == (String(x).slice(-(String(x).length / 2)))) {
                sum += x
            }
        }
    }
}

console.log(sum);
