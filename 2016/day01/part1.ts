const input = new TextDecoder("utf-8").decode(await Deno.readFile("input.txt")).split(", ");

let currentDirection = 0;

const changeDirection = (dir: string) => {
  currentDirection += dir === "L" ? -90 : 90;
  if (currentDirection < 0) currentDirection += 360;
  if (currentDirection >= 360) currentDirection -= 360;
};

let verticalDistance = 0;
let horizontalDistance = 0;

const move = (distance: number) => {
  if (currentDirection === 0) verticalDistance += distance;
  if (currentDirection === 90) horizontalDistance += distance;
  if (currentDirection === 180) verticalDistance -= distance;
  if (currentDirection === 270) horizontalDistance -= distance;
};

for (const i in input) {
  changeDirection(input[i].charAt(0));
  move(Number(input[i].substring(1)));
}

console.log(Math.abs(verticalDistance) + Math.abs(horizontalDistance));
