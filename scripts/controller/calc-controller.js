class Calccontroller {
  constructor() {
    this._lastOperator = "";
    this._lastNumber = "";

    this._operation = [];
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateCalcEl = document.querySelector("#data");
    this._timeCalcEl = document.querySelector("#hora");
    this._currentDate;
    this.initialize();
    this.initButtonsEvents();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);

    this.setLastNumberToDisplay();
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        let btnValue = btn.className.baseVal.replace("btn-", "");
        this.execBtn(btnValue); // <<< CHAMADA REAL DO MÉTODO!
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  }

  clearAll() {
    this._operation = [];
    this.setLastNumberToDisplay();
  }

  clearEntry() {
    this._operation.pop();
    this.setLastNumberToDisplay();
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  pushOperation(value) {
    this._operation.push(value);
    if (this._operation.length > 3) {
      this.calc();
    } else {
    }
  }

  getResult() {
    return eval(this._operation.join(""));
  }

  calc() {
    let last = "";
    this._lastOperator = this.getLastItem();

    if (this._operation.length > 3) {
      let firstItem = this._operation[0];
      this._operation = [firstItem, this._lastOperator, this.lastNumber];
    }

    if (this._operation.length > 3) {
      last = this._operation.pop();
      this._lastNumber = this.getResult();
    } else if (this._operation.length > 3) {
      this.lastNumber = this.getLastItem(false);
    }

    let result = this.getResult();
    if (last == "%") {
      result /= 100;
      this._operation = [result];
    } else {
      this._operation = [result];

      if (last) this._operation.push(last);
    }

    this.setLastNumberToDisplay();
  }

  getLastItem(isOperator = true) {
    let lastItem = "";

    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (isOperator) {
        if (this.isOperator(this._operation[i]) == isOperator) {
          lastItem = this._operation[i];
          break;
        }
        if (lastItem)
          lastItem = isOperator ? this._lastOperator : this._lastNumber;
      }
    }

    return lastItem;
  }

  setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false);

    if (!lastNumber) lastNumber = 0;
    this.displayCalc = lastNumber || 0;
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        console.log(value);
      } else {
        this.pushOperation(value);
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
        this.setLastNumberToDisplay();
      } else {
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseInt(value));

        this.setLastNumberToDisplay();
      }
    }
  }

  setError() {
    this.displayCalc = "error";
  }

  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;

      case "ce":
        this.clearEntry();
        break;

      case "soma":
        this.addOperation("+");
        break;

      case "subtracao":
        this.addOperation("-");
        break;

      case "divisao":
        this.addOperation("/");
        break;

      case "multiplicacao":
        this.addOperation("*");
        break;

      case "porcento":
        this.addOperation("%");
        break;

      case "igual":
        this.calc();
        break;

      case "ponto":
        this.addOperation(".");
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;

      default:
        this.setError();
    }
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale);
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeCalcEl.innerHTML;
  }
  set displayTime(value) {
    this._timeCalcEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateCalcEl.innerHTML;
  }

  set displayDate(value) {
    this._dateCalcEl.innerHTML = value;
  }

  get displayCalc() {
    return this._displayCalcEl.textContent;
  }

  set displayCalc(value) {
    this._displayCalcEl.textContent = value;
  }

  get currentDate() {
    return new Date();
  }
  set currentDate(value) {
    this._currentDate = value;
  }
}
