let vals = [];
let operator = "";
let currentValue = 0;
let currentValIsFloat = false;
let lastInputs = [];

let displayInputElem = document.querySelector("#display");

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const percent = function (a, b) {
  return (b * a) / 100;
};

const addVal = function (newVal) {
  lastInputs.push(newVal);

  if (vals.length == 0) {
    vals[0] = newVal;
    currentValue = newVal;
  } else if (vals.length == 1) {
    if (operator === "") {
      currentValue = vals[0] = vals[0] * 10 + newVal;
    } else {
      currentValue = vals[1] = newVal;
    }
  } else if (vals.length == 2) {
    currentValue = vals[1] = vals[1] * 10 + newVal;
  }
  updateDisplay();
};

const clearOpData = function () {
  vals = [];
  operator = "";
  lastInputs = [];
};

const clearDataAndDisplay = function () {
  clearOpData();
  currentValue = 0;
  updateDisplay();
};

const updateDisplay = function () {
  displayInputElem.value = currentValue;
};

const setOperator = function (op) {
  if (vals.length == 1) {
    operator = op;
  }
};

const currentValMakeFloat = function () {
  currentValIsFloat = true;
};

const undo = function () {
  var lastInput = lastInputs.pop();

  if (!lastInput) {
    return;
  }

  if (vals.length == 1 && operator === "") {
    currentValue = vals[0] = (vals[0] - lastInput) / 10;
  } else if (vals.length == 2) {
    currentValue = vals[1] = (vals[1] - lastInput) / 10;
  }
  updateDisplay();
};

const operate = function () {
  if (vals.length == 2 && operator) {
    switch (operator) {
      case "+":
        currentValue = add(...vals);
        break;
      case "-":
        currentValue = subtract(...vals);
        break;
      case "*":
        currentValue = multiply(...vals);
        break;
      case "/":
        currentValue = divide(...vals);
        break;
      case "%":
        currentValue = percent(...vals);
        break;

      default:
        break;
    }
    updateDisplay();
    clearOpData();
    vals[0] = currentValue;
  }
};

const configureOpButton = function (btnElem) {
  let callback;

  let op = btnElem.textContent;
  switch (op) {
    case "+":
    case "*":
    case "-":
    case "/":
    case "%":
      callback = () => setOperator(op);
      break;
    case "Del":
      callback = () => undo();
      break;
    case "C":
      callback = () => clearDataAndDisplay();
      break;
    case ".":
      callback = () => currentValMakeFloat();
      break;
    case "=":
      callback = () => operate();
      break;

    default:
      console.error(`Invalid op: '${op}'`);
      break;
  }

  btnElem.addEventListener("click", callback);
};

const configureClickEvents = function () {
  let buttonsArray = document.querySelectorAll("button");

  buttonsArray.forEach((btnElem) => {
    let intVal = parseInt(btnElem.textContent);
    if (!isNaN(intVal)) {
      btnElem.addEventListener("click", () => {
        addVal(intVal);
      });
      return;
    }
    configureOpButton(btnElem);
  });
};

configureClickEvents();
