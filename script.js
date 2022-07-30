class Calculator {
  constructor(display_prev, display_current) {
    this.display_prev = display_prev;
    this.display_current = display_current;
    this.clear();
  }

  clear() {
    this.dis_prev = "";
    this.dis_current = "";
    this.operator = undefined;
  }

  delete() {
    this.dis_current = this.dis_current.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.dis_current.includes(".")) return;
    this.dis_current = this.dis_current.toString() + number.toString();
  }

  calculate() {
    let result;
    const prev = parseFloat(this.dis_prev);
    const curr = parseFloat(this.dis_current);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operator) {
      case "+":
        result = prev + curr;
        break;
      case "-":
        result = prev - curr;
        break;
      case "*":
        result = prev * curr;
        break;
      case "/":
        result = prev / curr;
        break;
      case "%":
        result = prev % curr;
        break;
      default:
        return;
    }
    this.dis_prev = "";
    this.dis_current = result;
    this.operator = undefined;
  }

  operations(operator) {
    if (this.dis_current === "") return;
    if (this.dis_prev !== "") {
      this.calculate();
    }
    this.operator = operator;
    this.dis_prev = this.dis_current;
    this.dis_current = "";
  }

  updateDisplay() {
    this.display_current.innerText = this.dis_current;
    if (this.operator != null) {
      this.display_prev.innerText = `${this.dis_prev} ${this.operator}`;
    } else {
      this.display_prev.innerText = "";
    }
  }
}

const display_prev = document.querySelector("[data-display-prev]");
const display_current = document.querySelector("[data-display-current]");
const btn_c = document.querySelector("[data-btn-c]");
const btn_del = document.querySelector("[data-btn-del]");
const btn_equal = document.querySelector("[data-btn-equal]");
const buttons = document.querySelectorAll("[data-btn]");
const operators = document.querySelectorAll("[data-btn-operator");

const calculator = new Calculator(display_prev, display_current);

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
);

operators.forEach((button) =>
  button.addEventListener("click", (e) => {
    calculator.operations(button.innerText);
    calculator.updateDisplay();
  })
);

btn_equal.addEventListener("click", (btn) => {
  calculator.calculate();
  calculator.updateDisplay();
});

btn_c.addEventListener("click", (btn) => {
  calculator.clear();
  calculator.updateDisplay();
});

btn_del.addEventListener("click", (btn) => {
  calculator.delete();
  calculator.updateDisplay();
});
