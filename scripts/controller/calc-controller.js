class Calccontroller {
  constructor() {
    this.__operationn = [];
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
  }

  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
  }

  initButtonsEvents() {
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");

    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        console.log(btn.className.baseVal.replace("btn-", ""));
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  }

  clearAll() {
    this._operation = [];
  }

  clearEntry() {
    this.__operation.pop();
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  isOparator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  pushOperation(value) {
    this.__operationn.push(value);
    if (this._operation.length > 3) {
      this.calc();
    } else {
    }
  }

  calc() {
    let last = this._operation.pop();

    let result = eval(this._operation.join(""));

    this._operation = [result, last];

    this.setLastNumberToDisplay();
  }

  setLastNumberToDisplay() {
    let lastNumber;

    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (this.isOparator(this._operation[i])) {
        let lastNumber = this._operation[i];
        break;
      }
    }
    this.displayCalc = lastNumber;
  }

  add_operationn(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOparator(value)) {
        this.setLastOperation(value);
      } else if (isNaN(value)) {
        console.log(value);
      } else {
        this.pushOperation(value);
      }
    } else {
      if (this.isOparator(value)) {
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
        this.add_operationn("+");
        break;

      case "subtracao":
        this.add_operationn("-");
        break;

      case "divisao":
        this.add_operationn("/");
        break;

      case "multiplicacao":
        this.add_operationn("*");
        break;

      case "porcento":
        this.add_operationn("%");
        break;

      case "igual":
        // implementar cálculo aqui
        break;

      case "ponto":
        this.add_operationn(".");
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
        this.add_operationn(parseInt(value));
        break;

      default:
        this.setError();
    }
  }

  getLast_operationn() {
    return this.__operationn[this.__operationn.length - 1];
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this._locale);
    this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
  }

  get displayTime() {
    return this._timeCalcEl.innerHTML;
  }
  set displayTime(value) {
    this._dateCalcEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateCalcEl.innerHTML;
  }

  set displayDate(value) {
    this._dateCalcEl.innerHTML = value;
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }
  set displayCalc(value) {
    this._dateCalcEl.innerHTML = value;
  }
  get currentDate() {
    return new Date();
  }
  set currentDate(value) {
    this._currentDate = value;
  }
}
