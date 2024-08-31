const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

let cityNames = [];
let cityDistances = Array(8)
  .fill()
  .map(() => Array(8).fill(0));

//get list of city names
input.map((distanceBetween) => {
  const split = distanceBetween.split(" ");
  assignCityNames(split[0]);
  assignCityNames(split[2]);
});

//populate graph with distances between cities
input.map((distanceBetween) => {
  const split = distanceBetween.split(" ");
  populateDistances(split[0], split[2], split[4]);
});

function assignCityNames(city) {
  if (!cityNames.includes(city)) {
    cityNames.push(city);
  }
}

function populateDistances(cityA, cityB, distance) {
  cityDistances[cityNames.indexOf(cityA)][cityNames.indexOf(cityB)] = distance;
  cityDistances[cityNames.indexOf(cityB)][cityNames.indexOf(cityA)] = distance;
}

///////////// puzzle thyme
let longestPath;

permutate(cityNames, []);

function permutate(cityNames, perms) {
  if (cityNames.length === 0) {
    testTravelDistance(perms);
  } else {
    for (let i = 0; i < cityNames.length; i++) {
      let trimmedList = [...cityNames];
      let removed = trimmedList.splice(i, 1);
      perms.push(removed);
      permutate(trimmedList, perms);
      perms.pop();
    }
  }
}

function testTravelDistance(newPath) {
  let pathDistance = [];
  let cleanedPath = [];

  for (let i = 0; i < newPath.length; i++) {
    cleanedPath[i] = newPath[i][0];
  }

  for (let i = 0; i < cleanedPath.length - 1; i++) {
    pathDistance[i] = Number(
      cityDistances[cityNames.indexOf(cleanedPath[i])][
        cityNames.indexOf(cleanedPath[i + 1])
      ]
    );
  }

  let distanceSum = 0;

  pathDistance.forEach((distance) => {
    distanceSum += distance;
  });

  if (longestPath === undefined) {
    longestPath = distanceSum;
  }
  if (distanceSum > longestPath) {
    longestPath = distanceSum;
    console.log(longestPath);
  }
}

console.log(`Longest path is ${longestPath}`);
