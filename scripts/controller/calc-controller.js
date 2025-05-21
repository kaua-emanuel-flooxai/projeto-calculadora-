class Calccontroller {
  constructor() {
    this._locale = "pt-BR";
    this._displayCalcEl = document.querySelector("#display");
    this._dateCalcEl = document.querySelector("#data");
    this._timeCalcEl = document.querySelector("#hora");
    this._currentDate;
    this.initialize();
  }

  initialize() {
    this.setDisplayDateTime();

    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
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
