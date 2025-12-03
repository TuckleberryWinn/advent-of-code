const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();

const rows = input.split('\r\n')

let sum = 0
for (const row of rows) {
    console.log(row)
    let firstDigit = 0
    let firstDigitIndex = 0
    let secondDigit = 0
    for (let i = 0; i < String(row).length-1; i++) {
        if (Number(String(row)[i]) > firstDigit) {
            firstDigit = Number(String(row)[i])
            firstDigitIndex = i
        }
    }
    for (let i = firstDigitIndex + 1; i <String(row).length; i++) {
        if (Number(String(row)[i]) > secondDigit) {
            secondDigit = Number(String(row)[i])
        }
    }
    const total = (firstDigit * 10) + secondDigit
    sum += total
}

console.log(sum);
