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
  return b === 0 ? 0 : a / b;
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
      currentValue = vals[0] = vals[0] + newVal;
    } else {
      currentValue = vals[1] = newVal;
    }
  } else if (vals.length == 2) {
    currentValue = vals[1] = vals[1] + newVal;
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
  if (vals.length == 0) {
    currentValue = vals[0] = "0.";
  } else if (vals.length == 1) {
    if (operator !== "") {
      currentValue = vals[1] = "0.";
    } else if (vals[0].indexOf(".") === -1) {
      currentValue = vals[0] += ".";
    }
  } else if (vals.length == 2) {
    if (vals[1].indexOf(".") !== -1) {
      return;
    }
    currentValue = vals[1] += ".";
  }
  updateDisplay();
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
  let a = parseFloat(vals[0]);
  let b = parseFloat(vals[1]);
  if (vals.length == 2 && operator) {
    switch (operator) {
      case "+":
        currentValue = add(a, b);
        break;
      case "-":
        currentValue = subtract(a, b);
        break;
      case "*":
        currentValue = multiply(a, b);
        break;
      case "/":
        currentValue = divide(a, b);
        break;
      case "%":
        currentValue = percent(a, b);
        break;

      default:
        break;
    }
    updateDisplay();
    clearOpData();
    vals[0] = currentValue.toString();
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
    let strVal = btnElem.textContent;
    let intVal = parseInt(strVal);
    if (!isNaN(intVal)) {
      btnElem.addEventListener("click", () => {
        addVal(strVal);
      });
      return;
    }
    configureOpButton(btnElem);
  });
};

configureClickEvents();
