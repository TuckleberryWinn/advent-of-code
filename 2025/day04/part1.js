const fs = require("fs");
let input = fs.readFileSync("input.txt").toString();


const rows = input.split('\r\n')
const offsets = [{dX: -1, dY: -1}, {dX: -1, dY: 0}, {dX: -1, dY: 1}, {dX: 0, dY: 1}, {dX: 1, dY: 1}, {dX: 1, dY: 0}, {dX: 1, dY: -1}, {dX: 0, dY: -1}]

let freeRolls = 0
const neighborCount = (line, val) => {
    let count = 0

    for (const checkCell of offsets) {
        const newX = line + checkCell.dX
        const newY = val + checkCell.dY
        if (newX < 0 || newY < 0) continue
        if (newX >= rows[line].length || newY >= rows.length) continue

        if (rows[newX][newY] == '@') {
            count++
        }
    }
    return count
}

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        if (rows[i][j] == '@') {
            if (neighborCount(i,j) < 4) {
                freeRolls++
            }
        }
    }
}

console.log(freeRolls);