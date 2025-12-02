const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

const ranges = input.split(',')

let sum = 0
for (const range of ranges) {
    const ends = range.split('-')

    for (let x = Number(ends[0]); x <= Number(ends[1]); x++) {
        const digits = Array.from(String(x), Number)
        const testObject = {}
        for (const digit of digits) {
           if (testObject[digit]) {
            testObject[digit] += 1
           } else {
            testObject[digit] = 1
           }
        }

        if (!Object.values(testObject).includes(1)) {
            if (/^(\d+)\1+$/.test(x)){
                sum += x
            }
        }
    }
}

console.log(sum);
