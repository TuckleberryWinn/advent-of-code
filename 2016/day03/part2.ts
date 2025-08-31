const input = new TextDecoder("utf-8").decode(await Deno.readFile("input.txt"));

const result = {
  possibleTrianges: 0,
};

const data = input.split("\r\n").map((x) =>
  x
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x))
);
for (let i = 0; i < data.length; i += 3) {
  [data[i + 0][1], data[i + 1][0]] = [data[i + 1][0], data[i + 0][1]];
  [data[i + 0][2], data[i + 2][0]] = [data[i + 2][0], data[i + 0][2]];
  [data[i + 1][2], data[i + 2][1]] = [data[i + 2][1], data[i + 1][2]];
}

data.forEach((sides) => {
  result.possibleTrianges +=
    sides[0] + sides[1] > sides[2] && sides[0] + sides[2] > sides[1] && sides[1] + sides[2] > sides[0] ? 1 : 0;
});

console.log(result);
