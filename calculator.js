let vals = [];
let operator = "";
let currentValue = 0;
let lastInput = "";

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

const addVal = function (val) {
  lastInput = val;
  console.log(val);

  if (vals.length == 2) {
    if (vals[1]) {
      // TODO: if float -> can add more digits
    } else {
      console.error("Already have values, can't set a new one");
    }
    return;
  }

  if (vals.length == 0) {
    vals[0] = val;
    currentValue = val;
    updateDisplay();
  }

  if (vals.length == 1 && operator) {
    vals[1] = val;
    currentValue = val;
    updateDisplay();
  }
};

const clearOpData = function () {
  vals = [];
  operator = "";
  lastInput = "";
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

const currentValMakeFloat = function () {};

const undo = function () {};

const operate = function () {
  if (vals.length == 2 && operator) {
    console.log("operate");
    // TODO: Switch on op
    currentValue = add(vals[0], vals[1]);
    updateDisplay();
    clearOpData();
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
