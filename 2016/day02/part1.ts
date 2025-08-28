const input = new TextDecoder("utf-8").decode(await Deno.readFile("input.txt"));

console.log(input);
