class StateMachine {
  constructor() {
    this.states = {};
    this.currentState = null;
    this.currentStateIndex = 0;
    this.currentStep = null;
  }
  // Для работы со стейтом
  addState(name, steps) {
    this.states[name] = steps;
  }
  getStates() {
    return this.states;
  }
  // Для работы с индексом стейта Шага
  addCurrentStateIndex(stepsLength, handler) {
    console.log(this.currentStateIndex < stepsLength);
    console.log(this.currentStateIndex, stepsLength);
    if (this.currentStateIndex < stepsLength) {
      console.log("stepsLength", stepsLength);
      this.currentStateIndex += 1;
    } else {
      this.currentStateIndex = 0;
      console.log(handler());
    }
  }
  // Для получ текущего индекса шага
  getCurrentStateIndex() {
    return this.currentStateIndex;
  }
  // Выбор шага в текущем стейте
  chooseCurrentStep(name) {
    this.currentStep = name;
  }
  // Выбор текущего стейта
  chooseCurrentState(name) {
    if (this.states[name]) {
      this.currentState = name;
    } else {
      console.error("Error: State does not exist");
    }
  }
  // изменить value в шаге
  changeValue(name, index, text) {
    this.states[name].steps[index].value = text;
  }
  // Получить текущий стейт
  getCurrentState() {
    return this.currentState;
  }
  // Получить текущий шаг
  getCurrentSteps() {
    return this.states[this.currentState];
  }
}

module.exports = StateMachine;
