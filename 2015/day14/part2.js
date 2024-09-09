const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");

let reindeer = [];

//prompt variables

const raceDuration = 2503;

class Reindeer {
  constructor(name, runSpeed, runDuration, restDuration) {
    this.name = name;
    this.runSpeed = Number(runSpeed);
    this.runDuration = Number(runDuration);
    this.restDuration = Number(restDuration);
    this.runCounter = 0;
    this.restCounter = 0;
    this.distanceTraveled = 0;
    this.pointsEarned = 0;
  }
  raceForSeconds(duration) {
    for (let i = 0; i < duration; i++) {
      //if both run and rest durations are complete, reset counters
      if (
        this.runCounter === this.runDuration &&
        this.restCounter === this.restDuration
      ) {
        this.runCounter = 0;
        this.restCounter = 0;
      }
      //if reindeer can run, they do
      if (this.runCounter < this.runDuration) {
        this.runCounter += 1;
        this.distanceTraveled += this.runSpeed;
      }
      //if reindeer has exuasted run duration, they rest
      else {
        this.restCounter += 1;
      }
    }
  }
}
//get reindeer stats from initial input
for (let i = 0; i < input.length; i++) {
  buildReindeer(input[i], i);
}

function buildReindeer(stats, i) {
  let splitInput = stats.split(" ");
  let name = splitInput[0];
  let runSpeed = splitInput[3];
  let runDuration = splitInput[6];
  let restDuration = splitInput[13];

  reindeer[i] = new Reindeer(name, runSpeed, runDuration, restDuration);
}

function raceAndScoreReindeer() {
  for (let i = 0; i < raceDuration; i++) {
    incrementAllReindeer();
    let leadingScore = getLeadingReindeerDistance();
    givePointToLeadingReindeer(leadingScore);
  }
  determineWinningReindeer();
}

function incrementAllReindeer() {
  for (let i = 0; i < reindeer.length; i++) {
    reindeer[i].raceForSeconds(1);
  }
}

function getLeadingReindeerDistance() {
  let leadingReindeerDistance = 0;
  for (let i = 0; i < reindeer.length; i++) {
    if (reindeer[i].distanceTraveled > leadingReindeerDistance) {
      leadingReindeerDistance = reindeer[i].distanceTraveled;
    }
  }
  return leadingReindeerDistance;
}

function givePointToLeadingReindeer(distanceToScore) {
  for (let i = 0; i < reindeer.length; i++) {
    if (reindeer[i].distanceTraveled === distanceToScore) {
      reindeer[i].pointsEarned += 1;
    }
  }
}

function determineWinningReindeer() {
  let winnerName = "";
  let winnerPointCount = 0;
  for (let i = 0; i < reindeer.length; i++) {
    if (reindeer[i].pointsEarned > winnerPointCount) {
      winnerPointCount = reindeer[i].pointsEarned;
      winnerName = reindeer[i].name;
    }
  }
  console.log(`${winnerName} won the race with ${winnerPointCount} points!`);
}

raceAndScoreReindeer();
