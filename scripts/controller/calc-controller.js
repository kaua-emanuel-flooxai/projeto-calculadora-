class Calccontroller {
  constructor() {
    this._displayCalc = "0";
    this._currentDate;
    this.initialize();
  }

  initialize() {
    let displayCalcEl = document.querySelector("#display");
    let dateCalcEl = document.querySelector("#data");
    let timeCalcEl = document.querySelector("#hora");

    displayCalcEl.innerHTML = "38231";
    dateCalcEl.innerHTML = "22/02/3211";
    timeCalcEl.innerHTML = "13:31";
  }

  get displayCalc() {
    return this._displayCalc;
  }
  set displayCalc(valor) {
    this.displayCalc = valor;
  }
  get currentDate() {
    return this.currentDate;
  }
  set currentDate(valor) {
    this._currentDate = valor;
  }
}
