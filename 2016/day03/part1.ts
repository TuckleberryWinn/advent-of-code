const input = new TextDecoder("utf-8").decode(await Deno.readFile("input.txt"));

const data = input.split("\r\n");

const result = {
  possibleTrianges: 0,
};

data.forEach((x) => {
  const sides = x
    .split(" ")
    .filter((x) => x !== "")
    .map((x) => Number(x));

  result.possibleTrianges +=
    sides[0] + sides[1] > sides[2] && sides[0] + sides[2] > sides[1] && sides[1] + sides[2] > sides[0] ? 1 : 0;
});

console.log(result);
