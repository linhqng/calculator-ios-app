let result = document.getElementById("result-content");
let fValue = null; //first value
let lValue = null; //last value
let operator = null;
let isOperatorClicked = false;

let buttons = document.querySelectorAll(".btn");

function calculate(final) {
  if (fValue !== null && lValue !== null && operator !== null) {
    const operators = {
      "+": () => (fValue = fValue + lValue),
      "-": () => (fValue = fValue - lValue),
      x: () => (fValue = fValue * lValue),
      "÷": () => (fValue = fValue / lValue),
      "%": () => (fValue = fValue % lValue),
    };
    operators[operator] && operators[operator]();
    // Keep the latest operation for the result action
    // if (!final) {
    lValue = null;
    // }
    result.innerHTML = fValue;

    console.log("Calcualte  - " + fValue + " - " + lValue);
  } else {
    console.log("Ignore  - " + fValue + " - " + lValue);
  }
}

function assign() {
  if (operator !== null) {
    lValue = +result.innerHTML;
  } else {
    fValue = +result.innerHTML;
  }
  console.log("Assign  - " + fValue + " - " + lValue);
}

function handleClear() {
  fValue = lValue = null;
  operator = null;
  result.innerHTML = 0;
  isOperatorClicked = false;
  document.querySelector(".btn-gray").innerHTML = "AC";
}

function handleOperator(operation) {
  if (operator) {
    calculate();
    operator = operation;
  } else {
    operator = operation;
    calculate();
  }
  isOperatorClicked = true;
}

function handleResult() {
  calculate(true);
}

function handleDot() {
  if (isOperatorClicked) {
    result.innerHTML = ".";
    isOperatorClicked = false;
  } else {
    result.innerHTML = result.innerHTML == 0 ? "." : result.innerHTML + ".";
  }
  assign();
}

function handleInputNumber(number) {
  document.querySelector(".btn-gray").innerHTML = "C";
  if (isOperatorClicked) {
    result.innerHTML = number;
    isOperatorClicked = false;
  } else {
    result.innerHTML =
      result.innerHTML == 0 ? number : result.innerHTML + +number;
  }
  assign();
}

const nodes = {
  AC: handleClear,
  C: handleClear,
  "%": handleOperator,
  "÷": handleOperator,
  x: handleOperator,
  "-": handleOperator,
  "+": handleOperator,
  "=": handleResult,
  ".": handleDot,
  "0": handleInputNumber,
  "1": handleInputNumber,
  "2": handleInputNumber,
  "3": handleInputNumber,
  "4": handleInputNumber,
  "5": handleInputNumber,
  "6": handleInputNumber,
  "7": handleInputNumber,
  "8": handleInputNumber,
  "9": handleInputNumber,
};

function addActionToButton(node) {
  nodes[node.innerHTML] &&
    node.addEventListener("click", () => nodes[node.innerHTML](node.innerHTML));
}

buttons.forEach((btn) => addActionToButton(btn));
