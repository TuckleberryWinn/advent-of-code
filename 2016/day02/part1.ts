const input = new TextDecoder("utf-8").decode(await Deno.readFile("input.txt"));

const lines = input.split("\r\n");

const inputs: number[] = [];

const keypad: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let i = 0; i < lines.length; i++) {
  const instructions = lines[i].split("");
  const currentPos = {
    vert: 0,
    hor: 0,
  };
  for (const i in instructions) {
    console.log(currentPos);
    switch (instructions[i]) {
      case "U":
        currentPos.hor = Math.min(1, (currentPos.hor += 1));
        break;
      case "R":
        currentPos.vert = Math.min(1, (currentPos.vert += 1));
        break;
      case "D":
        currentPos.hor = Math.max(-1, (currentPos.hor -= 1));
        break;
      case "L":
        currentPos.vert = Math.max(-1, (currentPos.vert -= 1));
        break;
    }
  }
  inputs.push(keypad[currentPos.hor + 1][currentPos.vert + 1]);
}
console.log(inputs);
