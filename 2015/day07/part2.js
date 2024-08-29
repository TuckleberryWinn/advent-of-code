const fs = require("node:fs");
const path = require("node:path");
const inputPath = path.join(path.dirname(require.main.filename), "input.txt");
let input = fs.readFileSync(inputPath).toString();

//I am a disgusting heathen. We hardcode up in here. #MagicNumberSquad
input = input.replace("19138", "16076");
input = input.trim().split("\n");

let cleanedInput = input.map((instruction) => {
  const inputSplit = instruction.split(" -> ");
  let inputs = inputSplit[0].split(" ");
  let output = inputSplit[1].replace("\r", "");

  let operandPrior;
  let operator = "DIRECTASSIGNMENT";
  let operandLatter;
  let value;
  let instructionExecuted = false;

  if (inputs.length === 3) {
    operandPrior = inputs[0];
    operator = inputs[1];
    operandLatter = inputs[2];
  } else if (inputs.length === 2) {
    operator = inputs[0];
    operandPrior = inputs[1];
  } else {
    const typeTest = inputs[0] * 1;
    if (Number.isNaN(typeTest)) {
      operandPrior = inputs[0];
    } else {
      value = inputs[0];
    }
  }

  const result = {
    operandPrior,
    operator,
    operandLatter,
    value,
    output,
    instructionExecuted,
  };

  return result;
});

let wireValues = {};

let testCase = 0;
while (true) {
  for (let i = 0; i < cleanedInput.length; i++) {
    //   console.log(cleanedInput[i]);
    testCase++;

    //loop through instructions to check if they still need to be completed
    if (cleanedInput[i].instructionExecuted) {
      continue;
    }

    // add solved wires to wireValues and mark instruction as complete
    if (cleanedInput[i].value !== undefined) {
      wireValues[cleanedInput[i].output] = cleanedInput[i].value;
      cleanedInput[i].instructionExecuted = true;
    }

    //get values for relevant wires
    let priorValue;
    let latterValue;

    for (const wire in wireValues) {
      if (cleanedInput[i].operandPrior === wire) {
        priorValue = wireValues[wire];
      }
      if (cleanedInput[i].operandLatter === wire) {
        latterValue = wireValues[wire];
      }
    }

    //set prior value to number if initial input is number
    if (cleanedInput[i].operandPrior == 1) {
      priorValue = Number(cleanedInput[i].operandPrior);
    }

    //execute instructions if neccesary input is available
    if (cleanedInput[i].operator === "NOT") {
      if (priorValue === undefined) {
        continue;
      }
      cleanedInput[i].value = 65455 - priorValue;
    } else if (cleanedInput[i].operator === "OR") {
      if (priorValue === undefined || latterValue === undefined) {
        continue;
      }
      cleanedInput[i].value = priorValue | latterValue;
    } else if (cleanedInput[i].operator === "AND") {
      if (priorValue === undefined || latterValue === undefined) {
        continue;
      }
      cleanedInput[i].value = priorValue & latterValue;
    } else if (cleanedInput[i].operator === "RSHIFT") {
      if (priorValue === undefined) {
        continue;
      }
      cleanedInput[i].value = priorValue >> cleanedInput[i].operandLatter;
    } else if (cleanedInput[i].operator === "LSHIFT") {
      if (priorValue === undefined) {
        continue;
      }
      cleanedInput[i].value = priorValue << cleanedInput[i].operandLatter;
    } else if (cleanedInput[i].operator === "DIRECTASSIGNMENT") {
      cleanedInput[i].value = priorValue;
    }
  }
  //break once value for wire 'a' is found
  if (wireValues.a !== undefined) {
    console.log(wireValues.a);
    break;
  }
}
