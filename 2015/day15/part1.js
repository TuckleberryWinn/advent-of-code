const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

let ingredientList = [];
let highestScore = 0;
const remainingIngredients = 100;

//Break ingredients out of provided input and into workable objects
for (let i = 0; i < input.length; i++) {
  let splitInput = input[i].split(" ");
  let name = splitInput[0];
  let capacity = Number(splitInput[2].slice(0, -1));
  let durability = Number(splitInput[4].slice(0, -1));
  let flavor = Number(splitInput[6].slice(0, -1));
  let texture = Number(splitInput[8].slice(0, -1));
  let calories = Number(splitInput[10]);
  let ingredient = { name, capacity, durability, flavor, texture, calories };
  ingredientList.push(ingredient);
}

// Iterate through possible combinations and check score
let perfectCookie = {
  name: "Perfect Cookie",
  capacity: 0,
  durability: 0,
  flavor: 0,
  texture: 0,
  calories: 0,
};

// i = Sprinkes | j = Butterscotch | k = chocolate | l = candy
for (let i = 0; i < remainingIngredients + 1; i++) {
  for (let j = 0; j + i < remainingIngredients + 1; j++) {
    for (let k = 0; j + i + k < remainingIngredients + 1; k++) {
      for (let l = 0; j + i + k + l < remainingIngredients + 1; l++) {
        if (i + j + k + l === 100) {
          let ingredientValues = [i, j, k, l];
          let cookieScore = calculuateCookieValue(ingredientValues);
          checkIfHighScore(cookieScore);
        }
      }
    }
  }
}

function calculuateCookieValue(quantities) {
  let testCookie = {
    name: "Test Cookie",
    capacity: 0,
    durability: 0,
    flavor: 0,
    texture: 0,
    calories: 0,
  };

  for (let i = 0; i < quantities.length; i++) {
    testCookie.capacity += ingredientList[i].capacity * quantities[i];
    testCookie.durability += ingredientList[i].durability * quantities[i];
    testCookie.flavor += ingredientList[i].flavor * quantities[i];
    testCookie.texture += ingredientList[i].texture * quantities[i];
    testCookie.calories += ingredientList[i].calories * quantities[i];
  }
  //zero out negative values
  testCookie.capacity = Math.max(0, testCookie.capacity);
  testCookie.durability = Math.max(0, testCookie.durability);
  testCookie.flavor = Math.max(0, testCookie.flavor);

  return testCookie.capacity * testCookie.durability * testCookie.flavor * testCookie.texture;
}

function checkIfHighScore(score) {
  if (score > highestScore) {
    highestScore = score;
  }
}

console.log(`High score: ${highestScore}`);
