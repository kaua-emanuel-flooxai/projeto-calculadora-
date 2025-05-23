class Calccontroller {
  constructor() {
    this._Audio = new Audio("click.mp3");
    this._AudioOnOff = false;
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
    this.initKeyBoard();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);

    this.setLastNumberToDisplay();
    this.pasteFromClipKeyBoard();

    document.querySelectorAll(".btn-ac").forEach((btn) => {
      btn.addEventListener("dblclick", (e) => {
        this.ToggleAudio();
      });
    });
  }

  ToggleAudio() {
    this._AudioOnOff = !this._AudioOnOff;
  }

  playAudio() {
    if (this._AudioOnOff) {
      this._Audio.currentTime = 0;
      this._Audio.play();
    }
  }

  initKeyBoard() {
    document.addEventListener("keyup", (e) => {
      this.playAudio();

      switch (e.key) {
        case "Escape":
          this.clearAll();
          break;

        case "Backspace":
          this.clearEntry();
          break;

        case "*":
        case "/":
        case "-":
        case "+":
          this.addOperation(e.key);
          break;

        case "=":
        case "Enter":
          this.calc();
          break;

        case ".":
        case ",":
          this.addDot();
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
          this.addOperation(parseInt(e.key));
          break;

        case "c":
          if (e.ctrlKey) this.copyToKeyBoard();
          break;
      }
    });
  }

  copyToKeyBoard() {
    let input = document.createElement("input");
    input.value = this.displayCalc;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.remove();
  }

  pasteFromClipKeyBoard() {
    document.addEventListener("paste", (e) => {
      let text = e.clipboardData.getData("Text");
      this.displayCalc = parseFloat(text);
    });
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
        this.execBtn(btnValue);
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", (e) => {
        btn.style.cursor = "pointer";
      });
    });
  }

  clearAll() {
    this._operation = [];
    this._lastNumber = "";
    this._lastOperator = "";
    this.setLastNumberToDisplay();
  }

  clearEntry() {
    this._operation.pop();
    this.setLastNumberToDisplay();
  }

  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  pushOperation(value) {
    if (this.isOperator(value)) {
      const lastItem = this._operation[this._operation.length - 1];
      if (this.isOperator(lastItem)) {
        this._operation[this._operation.length - 1] = value;
        return;
      }
    }

    this._operation.push(value);

    if (this._operation.length > 3) {
      this.calc();
    }
  }

  getResult() {
    try {
      return eval(this._operation.join(""));
    } catch (e) {
      setTimeout(() => {
        this.setError();
      }, 1);
    }
  }

  calc() {
    let last = "";

    if (this._operation.length < 3) return;

    this._lastOperator = this.getLastItem();

    if (this._operation.length > 3) {
      last = this._operation.pop();
      this._lastNumber = this.getResult();
    } else if (this._operation.length === 3) {
      this._lastNumber = this.getLastItem(false);
    }

    let result = this.getResult();

    if (last === "%") {
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
      if (this.isOperator(this._operation[i]) === isOperator) {
        lastItem = this._operation[i];
        break;
      }
    }

    if (!lastItem) {
      lastItem = isOperator ? this._lastOperator : this._lastNumber;
    }

    return lastItem;
  }

  setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false);
    if (!lastNumber) lastNumber = 0;
    this.displayCalc = lastNumber;
  }

  addOperation(value) {
    if (isNaN(this.getLastOperation())) {
      if (this.isOperator(value)) {
        this.setLastOperation(value);
      } else {
        this.pushOperation(value);
        this.setLastNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseFloat(newValue));
        this.setLastNumberToDisplay();
      }
    }
  }

  setError() {
    this.displayCalc = "Error";
  }

  addDot() {
    let lastOperation = this.getLastOperation();

    if (
      typeof lastOperation === "string" &&
      lastOperation.split("").indexOf(".") > -1
    )
      return;

    if (this.isOperator(lastOperation) || !lastOperation) {
      this.pushOperation("0.");
    } else {
      this.setLastOperation(lastOperation.toString() + ".");
    }

    this.setLastNumberToDisplay();
  }

  execBtn(value) {
    this.playAudio();

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
        this.addDot(".");
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
    if (value.toString().length > 10) {
      this.setError();
      return false;
    }

    this._displayCalcEl.textContent = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(value) {
    this._currentDate = value;
  }
}
