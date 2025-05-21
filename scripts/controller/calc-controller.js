class Calccontroller {
  constructor() {
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
    this._oparation = [];
  }

  crearEntry() {
    this._operation.pop();
  }

  addOparation(value) {
    this._operation.push(value);
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
        this.crearEntry();
        break;
      case "soma":
        break;
      case "subtracao":
        break;
      case "divisao":
        break;
      case "multiplicacao":
        break;
      case "porcento":
        break;
      case "igual":
        break;

      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
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
    return this._dateCalcEl.innerHTML;
  }
  set displayTime(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get displayDate() {
    this._timeCalcEl.innerHTML;
  }
  set displayDate(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }
  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }
  get currentDate() {
    return new Date();
  }
  set currentDate(value) {
    this._currentDate = value;
  }
}
