const fs = require("node:fs");
const path = require("node:path");
//input paths
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
const weaponInputPath = path.join(path.dirname(require.main.filename), "shop_weapons.txt");
const armorInputPath = path.join(path.dirname(require.main.filename), "shop_armor.txt");
const ringsInputPath = path.join(path.dirname(require.main.filename), "shop_rings.txt");
//input texts
let input = fs.readFileSync(inputPath).toString().trim().split("\r\n");
let weaponInput = fs.readFileSync(weaponInputPath).toString().trim().split("\r\n");
let armorInput = fs.readFileSync(armorInputPath).toString().trim().split("\r\n");
let ringsInput = fs.readFileSync(ringsInputPath).toString().trim().split("\r\n");

const REGEX_WHITESPACE = /[ ,]+/;

let enemy = {};
let player = { HitPoints: 100 };
let possiblePlayerLoadouts = [];
let shopWeapons = [];
let shopArmor = [];
let shopRings = [];

//construct enemy stats

for (let i = 0; i < input.length; i++) {
  let parsedInput = input[i].split(":");
  enemy[String(parsedInput[0]).replace(" ", "")] = Number(parsedInput[1]);
}

//populate weapons
for (let i = 1; i < weaponInput.length; i++) {
  let splitInput = weaponInput[i].split(REGEX_WHITESPACE);
  let weaponTemplate = {};
  weaponTemplate.name = splitInput[0];
  weaponTemplate.cost = Number(splitInput[1]);
  weaponTemplate.damage = Number(splitInput[2]);
  weaponTemplate.armor = Number(splitInput[3]);
  shopWeapons.push(weaponTemplate);
}
//populate armor
for (let i = 1; i < armorInput.length; i++) {
  let splitInput = armorInput[i].split(REGEX_WHITESPACE);
  let armorTemplate = {};
  armorTemplate.name = splitInput[0];
  armorTemplate.cost = Number(splitInput[1]);
  armorTemplate.damage = Number(splitInput[2]);
  armorTemplate.armor = Number(splitInput[3]);
  shopArmor.push(armorTemplate);
}
//populate wings
for (let i = 1; i < ringsInput.length; i++) {
  let splitInput = ringsInput[i].split(REGEX_WHITESPACE);
  let ringsTemplate = {};
  ringsTemplate.name = splitInput[0].concat(splitInput[1]);
  ringsTemplate.cost = Number(splitInput[2]);
  ringsTemplate.damage = Number(splitInput[3]);
  ringsTemplate.armor = Number(splitInput[4]);
  shopRings.push(ringsTemplate);
}

GetAllPlayerLoadouts();

function GetAllPlayerLoadouts() {
  //iterate through weapons
  for (let i = 0; i < shopWeapons.length; i++) {
    let weaponChoice = shopWeapons[i];
    GetAllArmorOptions(weaponChoice);
  }
}

function GetAllArmorOptions(weapon) {
  for (let j = 0; j < shopArmor.length + 1; j++) {
    //leave one extra slot for the no armor option
    let armorChoice = {};
    if (j !== shopArmor.length) {
      armorChoice = shopArmor[j];
    }
    GetAllRingCombinations(weapon, armorChoice);
  }
}

function GetAllRingCombinations(weapon, armor) {
  let ring1 = {};
  let ring2 = {};
  //loadout for if no rings are purchased
  SumLoadoutForPlayer(weapon, armor, ring1, ring2);
  //loadout for if 1 ring is purchased
  for (let w = 0; w < ringsInput.length - 1; w++) {
    ring1 = shopRings[w];
    SumLoadoutForPlayer(weapon, armor, ring1, ring2);
  }
  //loadout for if 2 rings are purchased
  for (let x = 0; x < ringsInput.length - 1; x++) {
    for (let y = x + 1; y < ringsInput.length - 1; y++) {
      ring1 = shopRings[x];
      ring2 = shopRings[y];
      SumLoadoutForPlayer(weapon, armor, ring1, ring2);
    }
  }
}

function SumLoadoutForPlayer(weapon, armor, ring1, ring2) {
  let playerLoadout = {};
  playerLoadout.cost = (weapon.cost || 0) + (armor.cost || 0) + (ring1.cost || 0) + (ring2.cost || 0);
  playerLoadout.damage = (weapon.damage || 0) + (armor.damage || 0) + (ring1.damage || 0) + (ring2.damage || 0);
  playerLoadout.armor = (weapon.armor || 0) + (armor.armor || 0) + (ring1.armor || 0) + (ring2.armor || 0);
  possiblePlayerLoadouts.push(playerLoadout);
}

//sort possible loadouts by cost
possiblePlayerLoadouts.sort((a, b) => a.cost - b.cost);

//simulate fight until cheapest winning loadout is found

for (let i = 0; i < possiblePlayerLoadouts.length; i++) {
  let testEnemy = enemy;
  let testPlayer = player;
  testPlayer.damage = possiblePlayerLoadouts[i].damage;
  testPlayer.armor = possiblePlayerLoadouts[i].armor;
  testPlayer.cost = possiblePlayerLoadouts[i].cost;

  let fightStatus = SimulateCombat(testPlayer, testEnemy);

  if (fightStatus === "playerWin") {
    console.log(`Player's cheapest loadout is ${testPlayer.cost}`);
    break;
  }
}

function SimulateCombat(player, enemy) {
  let dummyPlayer = structuredClone(player);
  let dummyEnemy = structuredClone(enemy);

  while (true) {
    //Player turn
    dummyEnemy.HitPoints -= Math.max(1, dummyPlayer.damage - dummyEnemy.Armor);
    if (dummyEnemy.HitPoints <= 0) {
      return "playerWin";
    }

    //Enemy turn
    dummyPlayer.HitPoints -= Math.max(1, dummyEnemy.Damage - dummyPlayer.armor);
    if (dummyPlayer.HitPoints <= 0) {
      return "playerLose";
    }
  }
}
