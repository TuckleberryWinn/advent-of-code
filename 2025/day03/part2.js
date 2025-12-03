const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

const rows = input.split('\r\n')

let sum = 0
for (const row of rows) {
    const vals = new Array(12).fill(0)
    const lineLength = String(row).length
    let currentIndex = 0

    //Each array index
    for (let i = 0; i < vals.length; i++) {

        //Next index in row of numbers
        for (let j = currentIndex; j < lineLength - vals.length + i + 1; j++) {
            if (Number(row[j]) > vals[i]) {
                vals[i] = row[j]
                currentIndex = j + 1
            }
        }
    }

    const highestVoltage = vals.reduce((acc, nextVal) => acc + nextVal, '')
    sum += Number(highestVoltage)
    
    console.log(highestVoltage)
}

console.log(sum);
