const input = new TextDecoder("utf-8").decode(await Deno.readFile("input.txt"));

const lines = input.split("\r\n");

const inputs: string[] = [];

const keypad: string[][] = [
  ["x", "x", "1", "x", "x"],
  ["x", "2", "3", "4", "x"],
  ["5", "6", "7", "8", "9"],
  ["x", "A", "B", "C", "x"],
  ["x", "x", "D", "x", "x"],
];

const currentPos = {
  vert: 2,
  hor: 0,
};

for (let i = 0; i < lines.length; i++) {
  const instructions = lines[i].split("");
  for (const i in instructions) {
    switch (instructions[i]) {
      case "U":
        currentPos.vert += Math.abs(currentPos.vert - 1) + Math.abs(currentPos.hor) > 2 ? 0 : -1;
        break;
      case "D":
        currentPos.vert += Math.abs(currentPos.vert + 1) + Math.abs(currentPos.hor) > 2 ? 0 : 1;
        break;
      case "L":
        currentPos.hor += Math.abs(currentPos.vert) + Math.abs(currentPos.hor - 1) > 2 ? 0 : -1;
        break;
      case "R":
        currentPos.hor += Math.abs(currentPos.vert) + Math.abs(currentPos.hor + 1) > 2 ? 0 : 1;
        break;
    }
  }
  inputs.push(keypad[currentPos.vert + 2][currentPos.hor + 2]);
}

console.log(inputs);
