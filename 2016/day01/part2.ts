const input = new TextDecoder("utf-8").decode(await Deno.readFile("input.txt")).split(", ");

const trackMovement = (input: string[]) => {
  let x = 0;
  let y = 0;
  let direction = 0; // 0: North, 1: East, 2: South, 3: West
  const visitedLocations = new Set();

  visitedLocations.add(`0,0`);

  const instructions = input.map((i) => ({
    turn: i[0],
    blocks: parseInt(i.substring(1)),
  }));

  for (const instruction of instructions) {
    direction = instruction.turn === "R" ? (direction + 1) % 4 : (direction + 3) % 4;
    for (let i = 0; i < instruction.blocks; i++) {
      switch (direction) {
        case 0:
          y++;
          break; // North
        case 1:
          x++;
          break; // East
        case 2:
          y--;
          break; // South
        case 3:
          x--;
          break; // West
      }

      const currentPositionKey = `${x},${y}`;
      if (visitedLocations.has(currentPositionKey)) {
        console.log(Math.abs(x) + Math.abs(y));
      }
      visitedLocations.add(currentPositionKey);
    }
  }
};

trackMovement(input);
