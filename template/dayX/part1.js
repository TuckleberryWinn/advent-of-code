const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\n");
